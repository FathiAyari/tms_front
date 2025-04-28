import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link
      to="/add-vechile"
      className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition sm:ml-auto"
    >
      Add
    </Link>
  );
};

export default Button;
