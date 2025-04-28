import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-8 border-2 rounded-lg shadow-lg bg-white">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
