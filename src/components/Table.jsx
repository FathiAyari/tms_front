import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const OrdersTable = ({ orders, onDeleteClick }) => {
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
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="py-3 px-6">{order.status}</td>
              <td className="py-3 px-6">{order.status}</td>
              <td className="py-3 px-6">{order.status}</td>
              <td className="py-3 px-6 flex space-x-4">
                <Link
                  to={`/edit-vechile/${order._id}`}
                  className="text-white rounded-lg w-6"
                >
                  <img src={assets.edit_icone} alt="edit" />
                </Link>
                <button
                  onClick={() => onDeleteClick(order._id)}
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

export default OrdersTable;
