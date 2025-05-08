import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { signIn } from '../../services/authService';
import { useAuth } from '../../services/authContext'; // ✅ use context

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login from context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await signIn({ email, password });

      login(user); // ✅ this updates context, triggers rerender with proper routes

      if (user.status === 'inactive') {
        navigate('/inactive');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-md border border-stroke bg-white shadow-lg p-8">
          <div className="text-center mb-8">
          <span className="block text-sm font-medium text-gray-500 mb-2">
            Commencez gratuitement
          </span>
            <h2 className="text-2xl font-bold text-black">Connectez-vous à TMS</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
              <div className="relative">
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Entrez votre email"
                    className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">📧</span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Mot de passe</label>
              <div className="relative">
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="6+ caractères, 1 majuscule"
                    className="w-full rounded-lg border border-stroke bg-white py-3 pl-4 pr-10 text-black outline-none focus:border-primary"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">🔒</span>
              </div>
            </div>

            <button type="submit" className="w-full rounded-lg bg-custom-blue p-3 text-white font-semibold transition hover:bg-opacity-90">
              Se connecter
            </button>

            <div className="text-center mt-4 text-sm">
              <p>
                Vous n'avez pas de compte ?{' '}
                <Link to="/signup" className="text-custom-blue hover:underline">
                  Créez un compte
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SignIn;
