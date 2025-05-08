import { useEffect, useState } from "react";
import { fetchUsers, updateUserStatus } from "../../../services/UserServices.js"; // Create UsersService.js with methods similar to PostsService
import SearchBar from "../../../components/SearchBar.jsx";
import PaginationComponent from "../../../components/Pagination.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../components/Modal.jsx";
import "../../../assets/css/loader.css";
import TotalCount from "../../../components/TotalCount.jsx";
import { FaCheck, FaUndo, FaRegEye, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    // Debounce function for search input
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

    // Fetch clients from the API
    const getClients = async (searchQuery = "", page = 1) => {
        try {
            setLoading(true);
            const data = await fetchUsers(searchQuery, "", page);

            setTimeout(() => {
                setClients(data.users);
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

    // Call API on initial render and on changes to search term or page
    useEffect(() => {
        getClients(searchTerm, currentPage);
    }, [searchTerm, currentPage]);

    // Handle search term change
    const handleSearchChange = debounceSearch((query) => {
        setSearchTerm(query);
        setCurrentPage(1);
    }, 300);

    // Handle page change for pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Open the confirmation modal to delete a client
    const openModal = (id) => {
        setClientToDelete(id);
        setIsModalOpen(true);
    };

    // Close the confirmation modal
    const closeModal = () => {
        setIsModalOpen(false);
        setClientToDelete(null);
    };

    // Delete the client from the database
    const handleDelete = async () => {
        try {
            // Delete client logic
            setClients((prev) => prev.filter((client) => client._id !== clientToDelete));
            toast.success("Client supprimé avec succès !", { autoClose: 1500 });
            closeModal();
        } catch (error) {
            console.error("Error deleting client:", error);
            toast.error("Échec de la suppression du client.", { autoClose: 1500 });
            closeModal();
        }
    };

    // Toggle client status between active and inactive
    const toggleClientStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            await updateUserStatus(id, newStatus);
            toast.success(`Client ${newStatus === "active" ? "activé" : "désactivé"} avec succès !`, { autoClose: 1500 });
            getClients(searchTerm, currentPage); // Refresh clients list
        } catch (error) {
            toast.error("Erreur lors du changement de statut du client.", { autoClose: 1500 });
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 gap-4 sm:gap-10">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />
                <TotalCount totalCount={totalCount} />
            </div>

            {notFoundMessage ? (
                <div className="text-yellow-600 mb-4 p-7 text-center">{notFoundMessage}</div>
            ) : loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="loader"></div>
                </div>
            ) : clients.length === 0 ? (
                <div className="text-center text-gray-600 py-5">Aucun client trouvé.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Nom</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Statut</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client) => (
                                <tr key={client._id} className="border-t">
                                    <td className="py-3 px-6">{client.username}</td>
                                    <td className="py-3 px-6">{client.email}</td>
                                    <td className="py-3 px-6">{client.status}</td>
                                    <td className="py-3 px-6 flex space-x-4">
                                        <button
                                            onClick={() => toggleClientStatus(client._id, client.status)}
                                        >
                                            {client.status === "active" ? (
                                                <FaUndo className="text-xl text-red-500" />
                                            ) : (
                                                <FaCheck className="text-xl text-green-500" />
                                            )}
                                        </button>

                                        <button
                                            className="text-white rounded-lg w-6"
                                            onClick={() => openModal(client._id)}
                                        >
                                            <FaWindowClose className="text-xl text-gray-600" />
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
                message="Êtes-vous sûr de vouloir supprimer ce client ?"
            />
        </div>
    );
};

export default AdminClients;
