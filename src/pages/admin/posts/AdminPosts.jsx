import { useEffect, useState } from "react";
import {updatePostStatus, deletePost, fetchPosts } from "../../../services/PostsService.js";  // Make sure to create PostsService.js with methods similar to MessagesService
import SearchBar from "../../../components/SearchBar.jsx";
import PaginationComponent from "../../../components/Pagination.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../components/Modal.jsx";
import "../../../assets/css/loader.css";
import TotalCount from "../../../components/TotalCount.jsx";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets.js";
import {FaCheck, FaRegEye, FaUndo, FaWindowClose} from "react-icons/fa";
import AddOrderButton from "../../../components/Buton.jsx";

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
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

    // Fetch posts from the API
    const getPosts = async (searchQuery = "", page = 1) => {
        try {
            setLoading(true);
            const data = await fetchPosts(searchQuery,"", page);

            setTimeout(() => {
                setPosts(data.posts);
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
        getPosts(searchTerm, currentPage);
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

    // Open the confirmation modal to delete a post
    const openModal = (id) => {
        setPostToDelete(id);
        setIsModalOpen(true);
    };

    // Close the confirmation modal
    const closeModal = () => {
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    // Delete the post from the database
    const handleDelete = async () => {
        try {
            await deletePost(postToDelete);
            setPosts((prev) => prev.filter((p) => p._id !== postToDelete));
            toast.success("Post supprimé avec succès !", { autoClose: 1500 });
            closeModal();
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Échec de la suppression du post.", { autoClose: 1500 });
            closeModal();
        }
    };
    const handleAccept = async (id) => {
        try {
            await updatePostStatus(id, "accepté");
            toast.success("Post accepté avec succès !", { autoClose: 1500 });
            getPosts(searchTerm, currentPage);
        } catch (error) {
            toast.error("Erreur lors de l'acceptation du post.", { autoClose: 1500 });
        }
    };

    const handleDecline = async (id) => {
        try {
            await updatePostStatus(id, "refusé");
            toast.success("Post refusé avec succès !", { autoClose: 1500 });
            getPosts(searchTerm, currentPage);
        } catch (error) {
            toast.error("Erreur lors du refus du post.", { autoClose: 1500 });
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
            ) : posts.length === 0 ? (
                <div className="text-center text-gray-600 py-5">Aucun post trouvé.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Titre</th>
                                <th className="py-3 px-6 text-left">Auteur</th>
                                <th className="py-3 px-6 text-left">Statut</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map((post) => (
                                <tr key={post._id} className="border-t">
                                    <td className="py-3 px-6">{post.title}</td>
                                    <td className="py-3 px-6">{post.author.username}</td>
                                    <td className="py-3 px-6">{post.status}</td>
                                    <td className="py-3 px-6 flex space-x-4">
                                        <button onClick={() => handleAccept(post._id)}>
                                            <FaCheck className="text-xl text-green-500" />
                                        </button>
                                        <button onClick={() => handleDecline(post._id)}>
                                            <FaWindowClose className="text-xl text-red-500" />
                                        </button>

                                        <Link to={`/details-post/${post._id}`}>
                                            <FaRegEye className="text-xl text-blue-900" />
                                        </Link>
                                        <button
                                            className="text-white rounded-lg w-6"
                                            onClick={() => openModal(post._id)}>
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
                message="Êtes-vous sûr de vouloir supprimer ce post ?"
            />
        </div>
    );
};

export default AdminPosts;
