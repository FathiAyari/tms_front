import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { signUp } from '../../services/authService'; // Adjust path if needed

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = await signUp({ username, email, password });

            // Redirect based on user status
            if (user.status === 'inactive') {
                navigate('/inactive'); // Redirect to inactive page
            } else {
                navigate('/dashboard'); // Redirect to dashboard
            }
        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black mb-1">
                            Nom d'utilisateur
                        </label>
                        <div className="relative">
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Entrez votre nom d'utilisateur"
                                required
                                className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Entrez votre email"
                                required
                                className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                📧
                            </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="6+ caractères, 1 majuscule"
                                required
                                className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                🔒
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-custom-blue p-3 text-white font-semibold transition hover:bg-opacity-90"
                    >
                        S'inscrire
                    </button>

                    {/* Link to Sign In */}
                    <div className="text-center mt-4 text-sm">
                        <p>
                            Vous avez déjà un compte?{' '}
                            <Link to="/login" className="text-custom-blue hover:underline">
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
