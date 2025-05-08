import { useEffect, useState } from "react";
import {
    fetchReviews,
    deleteReview,
} from "../../../services/ReviewService.js";

import SearchBar from "../../../components/SearchBar.jsx";
import PaginationComponent from "../../../components/Pagination.jsx";
import ConfirmationModal from "../../../components/Modal.jsx";
import TotalCount from "../../../components/TotalCount.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets.js";
import "../../../assets/css/loader.css";
import AddOrderButton from "../../../components/Buton.jsx";

const ClientReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
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

    const getReviews = async (searchQuery = "", page = 1) => {
        try {
            setLoading(true);
            const data = await fetchReviews(searchQuery, page);

            setTimeout(() => {
                setReviews(data.reviews);
                setTotalPages(data.totalPages);
                setTotalCount(data.reviews.length);
                setNotFoundMessage("");
                setLoading(false);
            }, 300);
        } catch (error) {
            setNotFoundMessage(error.response?.data?.message || "Erreur");
            setLoading(false);
        }
    };
//hardcode
    useEffect(() => {

        getReviews(JSON.parse(localStorage.getItem("user")).id, currentPage);
    }, [searchTerm, currentPage]);

    const handleSearchChange = debounceSearch((query) => {
        setSearchTerm(query);
        setCurrentPage(1);
    }, 300);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openModal = (id) => {
        setReviewToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setReviewToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await deleteReview(reviewToDelete);
            setReviews((prev) => prev.filter((r) => r._id !== reviewToDelete));
            toast.success("Avis supprimé avec succès !", { autoClose: 1500 });
            closeModal();
        } catch (error) {
            toast.error("Erreur lors de la suppression de l'avis.", { autoClose: 1500 });
            closeModal();
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 gap-4 sm:gap-10">
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                <TotalCount totalCount={totalCount} />
                <AddOrderButton to="/add-review" text="Ajouter un avis" />
            </div>

            {notFoundMessage ? (
                <div className="text-yellow-600 mb-4 p-7 text-center">{notFoundMessage}</div>
            ) : loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="loader"></div>
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center text-gray-600 py-5">Aucun avis trouvé.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Utilisateur</th>
                                <th className="py-3 px-6 text-left">Message</th>
                                <th className="py-3 px-6 text-left">Évaluation</th>
                                <th className="py-3 px-6 text-left">Créé le</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reviews.map((review) => (
                                <tr key={review._id} className="border-t">
                                    <td className="py-3 px-6">{review.user?.username}</td>
                                    <td className="py-3 px-6">{review.message}</td>
                                    <td className="py-3 px-6">{review.review}</td>
                                    <td className="py-3 px-6">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-6 flex space-x-4">
                                        <Link to={`/edit-review/${review._id}`} className="w-6">
                                            <img src={assets.edit_icone} alt="edit" />
                                        </Link>
                                        <button onClick={() => openModal(review._id)} className="w-6">
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
                message="Êtes-vous sûr de vouloir supprimer cet avis ?"
            />
        </div>
    );
};

export default ClientReviews;
