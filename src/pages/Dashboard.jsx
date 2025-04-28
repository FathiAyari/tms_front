import { FaCar, FaCheckCircle, FaTimesCircle, FaTools } from "react-icons/fa";

const Dashboard = ({ stats }) => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-7">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <FaCar className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">TOTAL</h3>
              <p className="text-2xl font-bold text-gray-500">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 p-3 rounded-full">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">ACTIVE</h3>
              <p className="text-2xl font-bold text-gray-500">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 p-3 rounded-full">
              <FaTimesCircle className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">INACTIVE</h3>
              <p className="text-2xl font-bold text-gray-500">
                {stats.inactive}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <FaTools className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                MAINTENANCE
              </h3>
              <p className="text-2xl font-bold text-gray-500">
                {stats.maintenance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
