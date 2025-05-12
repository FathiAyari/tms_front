import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUp } from '../../services/authService';

const SignUp = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        if (userData.image) {
            formData.append('image', userData.image);
        }

        try {
            console.log(formData);
            const user = await signUp(formData);
            toast.success("Inscription réussie !");
            if (user.status === 'inactive') {
                navigate('/inactive');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err.message || 'Une erreur est survenue');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-md border border-stroke bg-white shadow-lg p-8">
                <div className="text-center mb-8">
                    <span className="block text-sm font-medium text-gray-500 mb-2">
                        Commencez gratuitement
                    </span>
                    <h2 className="text-2xl font-bold text-black">
                        Inscription à TMS
                    </h2>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black mb-1">
                            Nom d'utilisateur
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={userData.username}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre nom d'utilisateur"
                            className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            placeholder="Entrez votre email"
                            className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            placeholder="6+ caractères, 1 majuscule"
                            className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-black mb-1">
                            Image de profil
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 text-black outline-none focus:border-primary"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-custom-blue p-3 text-white font-semibold transition hover:bg-opacity-90"
                    >
                        S'inscrire
                    </button>

                    {/* Link to login */}
                    <div className="text-center mt-4 text-sm">
                        <p>
                            Vous avez déjà un compte ?{' '}
                            <Link to="/signin" className="text-custom-blue hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
