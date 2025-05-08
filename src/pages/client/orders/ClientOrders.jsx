import { useEffect, useState } from "react";
import { deleteOrder, fetchOrders } from "../../../services/OrdersService.js";
import SearchBar from "../../../components/SearchBar.jsx";
import AddOrderButton from "../../../components/Buton.jsx";
import PaginationComponent from "../../../components/Pagination.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../components/Modal.jsx";
import "../../../assets/css/loader.css";
import TotalCount from "../../../components/TotalCount.jsx";
import {Link} from "react-router-dom";
import {assets} from "../../../assets/assets.js";
import { FaRegEye} from "react-icons/fa";

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
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

  const getOrders = async (searchQuery = "", status = "", page = 1) => {
    try {
      setLoading(true);
      searchQuery=JSON.parse(localStorage.getItem('user')).id;
      const data = await fetchOrders(searchQuery, status, page);

      setTimeout(() => {
        setOrders(data.orders);
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
    getOrders(searchTerm, statusFilter, currentPage);
  }, [searchTerm, statusFilter, currentPage]);

  const handleSearchChange = debounceSearch((query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  }, 20);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (id) => {
    setOrderToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteOrder(orderToDelete);
      setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderToDelete)
      );
      toast.success("Commande supprimée avec succès !", {
        autoClose: 1500,
      });
      closeModal();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Échec de la suppression de la commande. Veuillez réessayer.", {
        autoClose: 1500,
      });
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

          <AddOrderButton to="/add-order" text="Ajouter un ordre"  />
        </div>

        {notFoundMessage ? (
            <div className="text-yellow-600 mb-4 p-7 text-center">
              {notFoundMessage}
            </div>
        ) : loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="loader"></div>
            </div>
        ) : orders.length === 0 ? (
            <div className="text-center text-gray-600 py-5">Aucune commande trouvée.</div>
        ) : (
            <>
              <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full table-auto">
                  <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Nom de client</th>
                    <th className="py-3 px-6 text-left">Destination</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orders.map((order) => (
                      <tr key={order._id} className="border-t">
                        <td className="py-3 px-6">{order.customerName}</td>
                        <td className="py-3 px-6">{order.destination}</td>
                        <td className="py-3 px-6">{order.status}</td>
                        <td className="py-3 px-6 flex space-x-4">
                          <Link
                              to={`/edit-order/${order._id}`}
                              className="text-white rounded-lg w-6"
                          >
                            <img src={assets.edit_icone} alt="edit" />
                          </Link>

                          <Link
                              to={`/details-order/${order._id}`}
                              className=" rounded-lg w-6"
                          >
                            <FaRegEye className="text-xl text-blue-900" />
                          </Link>

                          <button
                              onClick={() => openModal(order._id)}
                              className="text-white rounded-lg w-6"
                          >
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
            message="Êtes-vous sûr de vouloir supprimer cette commande ?"
        />
      </div>
  );
};

export default ClientOrders;
