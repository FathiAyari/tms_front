import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext.jsx"; // Adjust the path if needed

const Navbar = () => {
    const { user, logout } = useAuth(); // Get user and logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-[#FBFBFB] p-4 flex justify-between items-center border-b border-gray-300">
            <div className="text-[#515151] font-bold text-xl">
                <Link to="/">Transport Management System</Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-7 sm:items-center space-y-3 sm:space-y-0 mt-4 sm:mt-0">


                {user && (
                    <div className="flex items-center space-x-4">
                        <span className="text-black text-sm">Bonjour, {user.username}!</span>

                        <button
                            onClick={handleLogout}
                            className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition"
                        >
                            Déconnecter
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
