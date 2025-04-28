import { useNavigate } from "react-router-dom";
import VehicleForm from "../components/Form";

const AddVehicle = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/vechiles");
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={handleBack}
        className="text-blue-600 mb-4 hover:underline"
      >
        Back to Home
      </button>
      <VehicleForm />
    </div>
  );
};

export default AddVehicle;
