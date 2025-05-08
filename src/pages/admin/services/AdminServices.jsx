import { useEffect, useState } from "react";
import {
    fetchServices,
    deleteService
} from "../../../services/ServicesService.js";

import SearchBar from "../../../components/SearchBar.jsx";
import PaginationComponent from "../../../components/Pagination.jsx";
import ConfirmationModal from "../../../components/Modal.jsx";
import TotalCount from "../../../components/TotalCount.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets.js";
import "../../../assets/css/loader.css";
import AddOrderButton from "../../../components/Buton.jsx";

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
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

    const getServices = async (searchQuery = "", page = 1) => {
        try {
            setLoading(true);
            const data = await fetchServices(searchQuery, page);

            setTimeout(() => {
                setServices(data.services);
                setTotalPages(data.totalPages);
                setTotalCount(data.totalCount);
                setNotFoundMessage("");
                setLoading(false);
            }, 300);
        } catch (error) {
            setNotFoundMessage(error.response?.data?.message || "Erreur");
            setLoading(false);
        }
    };

    useEffect(() => {
        getServices(searchTerm, currentPage);
    }, [searchTerm, currentPage]);

    const handleSearchChange = debounceSearch((query) => {
        setSearchTerm(query);
        setCurrentPage(1);
    }, 300);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openModal = (id) => {
        setServiceToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setServiceToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await deleteService(serviceToDelete);
            setServices((prev) => prev.filter((s) => s._id !== serviceToDelete));
            toast.success("Service supprimé avec succès !", { autoClose: 1500 });
            closeModal();
        } catch (error) {
            toast.error("Erreur lors de la suppression du service.", { autoClose: 1500 });
            closeModal();
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

                <AddOrderButton to="/add-service" text="Ajouter un service"  />
            </div>

            {notFoundMessage ? (
                <div className="text-yellow-600 mb-4 p-7 text-center">{notFoundMessage}</div>
            ) : loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="loader"></div>
                </div>
            ) : services.length === 0 ? (
                <div className="text-center text-gray-600 py-5">Aucun service trouvé.</div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Nom</th>
                                <th className="py-3 px-6 text-left">Région</th>
                                <th className="py-3 px-6 text-left">Notes</th>
                                <th className="py-3 px-6 text-left">Créé le</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service) => (
                                <tr key={service._id} className="border-t">
                                    <td className="py-3 px-6">{service.name}</td>
                                    <td className="py-3 px-6">{service.region}</td>
                                    <td className="py-3 px-6">{service.notes}</td>
                                    <td className="py-3 px-6">{new Date(service.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-6 flex space-x-4">
                                        <Link
                                            to={`/edit-service/${service._id}`}
                                            className="text-white rounded-lg w-6"
                                        >
                                            <img src={assets.edit_icone} alt="edit" />
                                        </Link>
                                        <button
                                            className="text-white rounded-lg w-6"

                                            onClick={() => openModal(service._id)}>
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
                message="Êtes-vous sûr de vouloir supprimer ce service ?"
            />
        </div>
    );
};

export default AdminServices;
