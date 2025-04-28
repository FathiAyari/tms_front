import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const VehicleTable = ({ vehicles, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Vehicle Name</th>
            <th className="py-3 px-6 text-left">Model</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} className="border-t">
              <td className="py-3 px-6">{vehicle.name}</td>
              <td className="py-3 px-6">{vehicle.model}</td>
              <td className="py-3 px-6">{vehicle.status}</td>
              <td className="py-3 px-6 flex space-x-4">
                <Link
                  to={`/edit-vechile/${vehicle._id}`}
                  className="text-white rounded-lg w-6"
                >
                  <img src={assets.edit_icone} alt="edit" />
                </Link>
                <button
                  onClick={() => onDeleteClick(vehicle._id)}
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
  );
};

export default VehicleTable;
