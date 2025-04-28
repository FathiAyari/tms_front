import { useEffect, useState } from "react";
import { deleteVehicle, fetchVehicles } from "../services/vehicleService";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import AddVehicleButton from "../components/Buton";
import VehicleTable from "../components/Table";
import PaginationComponent from "../components/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../components/Modal";
import "../assets/css/loader.css";
import TotalCount from "../components/TotalCount";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
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

  const getVehicles = async (searchQuery = "", status = "", page = 1) => {
    try {
      setLoading(true);
      const data = await fetchVehicles(searchQuery, status, page);

      setTimeout(() => {
        setVehicles(data.vehicles);
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
    getVehicles(searchTerm, statusFilter, currentPage);
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
    setVehicleToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVehicleToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteVehicle(vehicleToDelete);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle._id !== vehicleToDelete)
      );
      toast.success("Vehicle deleted successfully!", {
        autoClose: 1500,
      });
      closeModal();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete the vehicle. Please try again.", {
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
        <Filter
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
        />
        <AddVehicleButton />
      </div>

      {notFoundMessage ? (
        <div className="text-yellow-600 mb-4 p-7 text-center">
          {notFoundMessage}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="loader"></div>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center text-gray-600 py-5">No vehicles found.</div>
      ) : (
        <>
          <VehicleTable vehicles={vehicles} onDeleteClick={openModal} />
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
        message="Are you sure you want to delete this vehicle?"
      />
    </div>
  );
};

export default VehicleList;
