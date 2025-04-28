import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVehicleById } from "../services/vehicleService";
import VehicleForm from "../components/Form";

const EditVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/vechiles");
  };

  useEffect(() => {
    const getVehicle = async () => {
      const data = await fetchVehicleById(id);
      setVehicle(data);
    };
    getVehicle();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={handleBack}
        className="text-blue-600 mb-4 hover:underline"
      >
        Back to Home
      </button>
      {vehicle ? <VehicleForm initialData={vehicle} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditVehicle;
