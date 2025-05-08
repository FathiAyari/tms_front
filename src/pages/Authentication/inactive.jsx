// src/pages/Authentication/Inactive.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authContext.jsx"; // Adjust the path as needed

const Inactive = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to home after logout
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-6 max-w-md bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Compte inactif</h2>
                <p className="text-gray-700 mb-6">
                    Votre compte est en attente d'activation par un administrateur. Veuillez réessayer plus tard.
                </p>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
                    >
                        Déconnecter
                    </button>
                )}
            </div>
        </div>
    );
};

export default Inactive;
