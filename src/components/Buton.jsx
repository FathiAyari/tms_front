import { Link } from "react-router-dom";

const Button = ({ text, to, onClick, className = "", type = "button" }) => {
  const baseClasses =
      "inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition";

  // If a `to` prop is provided, render a <Link>
  if (to) {
    return (
        <Link to={to} className={`${baseClasses} ${className}`}>
          {text}
        </Link>
    );
  }

  // Otherwise, render a regular <button>
  return (
      <button type={type} onClick={onClick} className={`${baseClasses} ${className}`}>
        {text}
      </button>
  );
};

export default Button;
