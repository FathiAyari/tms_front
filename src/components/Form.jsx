import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addVehicle, updateVehicle } from "../services/vehicleService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VehicleForm = ({ initialData }) => {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    status: "Active",
    model: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (initialData) {
      setVehicleData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateVehicle(id, vehicleData);
        toast.success("Vehicle updated successfully!", {
          autoClose: 1500,
        });
      } else {
        await addVehicle(vehicleData);
        toast.success("Vehicle added successfully!", {
          autoClose: 1500,
        });
      }
      navigate("/vechiles");
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message) {
          setErrorMessage(message);
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {id ? "Edit Vehicle" : "Add New Vehicle"}
      </h2>

      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={vehicleData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter vehicle name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            value={vehicleData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Model
          </label>
          <input
            type="text"
            name="model"
            id="model"
            value={vehicleData.model}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter vehicle model"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {id ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
