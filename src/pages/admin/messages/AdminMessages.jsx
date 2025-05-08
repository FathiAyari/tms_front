import { useEffect, useState } from "react";
import { deleteMessage, fetchMessages } from "../../../services/MessagesService.js";
import SearchBar from "../../../components/SearchBar.jsx";
import PaginationComponent from "../../../components/Pagination.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../components/Modal.jsx";
import "../../../assets/css/loader.css";
import TotalCount from "../../../components/TotalCount.jsx";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets.js";
import { FaRegEye } from "react-icons/fa";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceSearch = (callback, delay) => {
        let timeout;
        return (e) => {
            const value = e.target.value;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(value);
            }, delay);
        };
    };

    const getMessages = async (searchQuery = "", page = 1) => {
        try {
            setLoading(true);
            const data = await fetchMessages(searchQuery, page);

            setTimeout(() => {
                setMessages(data.messages);
                setTotalPages(data.totalPages);
                setTotalCount(data.totalCount);
                setNotFoundMessage("");
                setLoading(false);
            }, 300);
        } catch (error) {
            const { message } = error.response.data;
            setNotFoundMessage(message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getMessages(searchTerm, currentPage);
    }, [searchTerm, currentPage]);

    const handleSearchChange = debounceSearch((query) => {
        setSearchTerm(query);
        setCurrentPage(1);
    }, 20);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openModal = (id) => {
        setMessageToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessageToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await deleteMessage(messageToDelete);
            setMessages((prev) => prev.filter((m) => m._id !== messageToDelete));
            toast.success("Message supprimé avec succès !", { autoClose: 1500 });
            closeModal();
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error("Échec de la suppression du message.", { autoClose: 1500 });
            closeModal();
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 gap-4 sm:gap-10">
                <TotalCount totalCount={totalCount} />
            </div>

            {notFoundMessage ? (
                <div className="text-yellow-600 mb-4 p-7 text-center">{notFoundMessage}</div>
            ) : loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="loader"></div>
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center text-gray-600 py-5">Aucun message trouvé.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Nom</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Sujet</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {messages.map((msg) => (
                                <tr key={msg._id} className="border-t">
                                    <td className="py-3 px-6">{msg.name}</td>
                                    <td className="py-3 px-6">{msg.email}</td>
                                    <td className="py-3 px-6">{msg.subject}</td>
                                    <td className="py-3 px-6 flex space-x-4">
                                        <Link to={`/details-message/${msg._id}`}>
                                            <FaRegEye className="text-xl text-blue-900" />
                                        </Link>
                                        <button
                                            className="text-white rounded-lg w-6"
                                            onClick={() => openModal(msg._id)}>
                                            <img src={assets.delete_icone} alt="delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
                message="Êtes-vous sûr de vouloir supprimer ce message ?"
            />
        </div>
    );
};

export default AdminMessages;
