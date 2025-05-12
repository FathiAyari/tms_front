import React, { useEffect, useState } from 'react';
import "../../assets/css/home.css";
import { assets } from "../../assets/assets.js";
import { fetchServices } from "../../services/ServicesService.js";
import {fetchReviews} from "../../services/ReviewService.js";
import {addMessage} from "../../services/MessagesService.js";
import {toast, ToastContainer} from "react-toastify";
import {backendURL} from "../../services/api.js";
import {fetchPosts} from "../../services/PostsService.js";
import {Link, useNavigate} from "react-router-dom";
import {signIn, signUp} from "../../services/authService.js";
import {useAuth} from "../../services/authContext.jsx"; // Import the service fetching function

const TMS = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
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
    const { login,user } = useAuth(); // ✅ get login from context

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [errorLogin, setErrorLogin] = useState('');

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setErrorLogin('');

        try {
            const user = await signIn({ email: emailLogin, password: passwordLogin });

            login(user); // ✅ update context

            if (user.status === 'inactive') {
                navigate('/inactive');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.log(err);
            setErrorLogin(err?.response?.data?.message || 'Erreur de connexion');
        }
    };


    // Functions to open and close modals
    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);
    const openRegisterModal = () => setRegisterModalOpen(true);
    const closeRegisterModal = () => setRegisterModalOpen(false);
    const formatDate = (iso) => {
        const date = new Date(iso);
        return isNaN(date.getTime())
            ? "Date invalide"
            : date.toLocaleString("fr-FR", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
    };
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState({
        totalReviews: 0,
        avgRating: 0,
        positiveReviews: 0
    });
    const [loading, setLoading] = useState(true);

    const [messageData, setMessageData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        const getServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data.services || []);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        const getReviews = async () => {
            try {
                const response = await fetchReviews();
                const reviews = response.reviews || [];
                setReviews(reviews);

                const totalReviews = reviews.length;
                const avgRating = totalReviews
                    ? reviews.reduce((acc, review) => {
                    return acc + (review.review === "bon" ? 5 : review.review === "moyenne" ? 3 : 1);
                }, 0) / totalReviews
                    : 0;

                const positiveReviews = reviews.filter(review => review.review === "bon").length;

                setReviewStats({
                    totalReviews,
                    avgRating: avgRating.toFixed(1),
                    positiveReviews
                });
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        const getPosts = async () => {
            try {
                const data = await fetchPosts("", "accepté");
                setPosts(data.posts || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();

        getServices();
        getReviews();
    }, []);

    const handleMessageChange = (e) => {
        const { name, value } = e.target;
        setMessageData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMessage(messageData);
            toast.success("Message envoyé avec succès !");
            setMessageData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            toast.error("Erreur lors de l'envoi du message.");
            console.error(error);
        }
    };
    return (
        <div>
            {/* Header and Navigation */}
            <header className="navbar py-4 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="C:\\Users\\Asus\\Downloads\\LOGOTMS.png" className="logo">
                        <img src={assets.tms} alt="TMS Logo" className="h-12" />
                    </a>
                    <button className="mobile-menu-button" id="mobileMenuButton">
                        <i className="fas fa-bars"></i>
                    </button>
                    <nav className="navbar-nav flex items-center" id="navbarNav">
                        <a href="#home" className="nav-link active">Accueil</a>
                        <a href="#services" className="nav-link">Services</a>
                        <a href="#blog" className="nav-link">Blog</a>
                        <a href="#testimonials" className="nav-link">Témoignages</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </nav>
                    <div className="flex items-center">
                        {user ? (


                                    <Link to="/dashboard" className="buttondash text-white px-4 py-1 rounded hover:bg-orange-600">
                                        Dashboard
                                    </Link>



                        ) : (<>
                                <button onClick={openLoginModal} className="btn-secondary mr-2">Connexion</button>
                                <button onClick={openRegisterModal} className="btn-primary">Inscription</button>
                            </>

                    )}
                        </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero-section py-20 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="hero-content">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Optimisez votre logistique avec notre TMS</h1>
                            <p className="text-lg mb-8">Notre système de gestion de transport (TMS) vous aide à automatiser et optimiser votre chaîne logistique pour réduire les coûts et améliorer l'efficacité.</p>
                            <div className="flex flex-wrap gap-4">
                                <button className="btn-primary">Demander une démo</button>
                                <button className="btn-secondary bg-white text-secondary">En savoir plus</button>
                            </div>
                        </div>
                        <div className="hero-image md:flex justify-end hidden">
                            <img src="https://cdn.jsdelivr.net/gh/horizon-ui/horizon-tailwind-react-corporate-template@main/public/images/hero-image.png" alt="Transport Management System" className="max-w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="section-title text-center mx-auto">Nos avantages</h2>
                    <p className="text-center mb-12 max-w-3xl mx-auto">Découvrez comment notre système de gestion de transport peut transformer votre logistique et vous faire économiser du temps et de l'argent.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature Cards */}
                        {[
                            {
                                icon: "fas fa-truck",
                                title: "Optimisation des routes",
                                description: "Calculez automatiquement les itinéraires les plus efficaces pour réduire les distances et les temps de conduite tout en maximisant l'utilisation des véhicules."
                            },
                            {
                                icon: "fas fa-chart-line",
                                title: "Analyse en temps réel",
                                description: "Accédez à des tableaux de bord complets et des rapports détaillés pour suivre les performances, identifier les tendances et prendre des décisions éclairées."
                            },
                            {
                                icon: "fas fa-wallet",
                                title: "Réduction des coûts",
                                description: "Réduisez vos coûts de transport jusqu'à 20% grâce à l'optimisation des chargements, la réduction des kilomètres à vide et la diminution des retards."
                            },
                            {
                                icon: "fas fa-mobile-alt",
                                title: "Application mobile",
                                description: "Permettez à vos chauffeurs d'accéder aux informations de livraison, de scanner des documents et de communiquer en temps réel depuis leur smartphone."
                            },
                            {
                                icon: "fas fa-sync",
                                title: "Intégration complète",
                                description: "Connectez facilement notre TMS à vos systèmes existants (ERP, WMS, comptabilité) pour une synchronisation parfaite des données."
                            },
                            {
                                icon: "fas fa-user-shield",
                                title: "Sécurité avancée",
                                description: "Protégez vos données avec nos systèmes de sécurité de pointe et assurez la conformité avec les réglementations en vigueur."
                            }
                        ].map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <div className="feature-icon">
                                    <i className={feature.icon}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-6">
                <div className="container mx-auto">
                    <h2 className="section-title text-center mx-auto">Nos services</h2>
                    <p className="text-center mb-12 max-w-3xl mx-auto">Notre plateforme de gestion de transport offre une gamme complète de services pour répondre à tous vos besoins logistiques.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service Cards */}
                        {loading ? (
                            <p className="text-center col-span-3">Chargement des services...</p>
                        ) : (
                            services.length > 0 ? (
                                services.map((service) => (
                                    <div className="service-card" key={service._id}>
                                        <div className="service-content">
                                            <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                                            <p className="mb-4">{service.notes}</p>
                                            <p className="text-sm text-gray-500">Région: {service.region}</p>
                                            <p className="text-sm text-gray-400">Ajouté le: {new Date(service.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3">Aucun service trouvé.</p>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 px-6 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="section-title text-center mx-auto">Témoignages clients</h2>
                    <p className="text-center mb-12 max-w-3xl mx-auto">Découvrez ce que nos clients disent de notre plateforme TMS et de l'amélioration de leur efficacité logistique.</p>
                    <div className="carousel">
                        <div className="carousel-inner">
                            {/* Testimonial Cards */}
                            {reviews.map((testimonial, index) => (
                                <div className="carousel-item" key={index}>
                                    <div className="testimonial-card">
                                        <p className="mb-4">{testimonial.message}</p>
                                        <div className="flex items-center">
                                            <img src={`${backendURL}/api${testimonial.user.image}`} className="testimonial-avatar mr-4" />

                                            <div>
                                                <span className="text-sm text-gray-500">{new Date(testimonial.createdAt).toLocaleDateString()}</span>

                                                <h4 className="font-bold">{testimonial.user.username}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="carousel-controls">
                            <span className="carousel-control active" data-index="0"></span>
                            <span className="carousel-control" data-index="1"></span>
                            <span className="carousel-control" data-index="2"></span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
                    <div>
                        <p className="text-5xl font-bold reviews">{reviewStats.totalReviews}</p>
                        <p className="text-gray-600">Avis totaux</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold reviews">{reviewStats.avgRating}</p>
                        <p className="text-gray-600">Note moyenne</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold reviews">{reviewStats.positiveReviews}</p>
                        <p className="text-gray-600">Avis positifs</p>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-20 px-6">
                <div className="container mx-auto">
                    <h2 className="section-title text-center mx-auto">Derniers articles</h2>
                    <p className="text-center mb-12 max-w-3xl mx-auto">Restez informé des dernières tendances et innovations dans le secteur du transport et de la logistique.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Blog Cards */}
                        {posts.map((blog, index) => (
                            <div className="blog-card" key={index}>
                                <img  src={`${backendURL}/api${blog.image}`} alt={blog.title} className="blog-image" />
                                <div className="blog-content">
                                    <span className="blog-date">{formatDate(blog.publishedAt)}</span>
                                    <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                                    <img src={`${backendURL}/api${blog.author.image}`} className="testimonial-avatar mr-4" />

                                    <h3 className="text-xl font-bold mb-3">{blog.author?.username || "Anonyme"}</h3>
                                    <p className="mb-4">{blog.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="section-title text-center mx-auto">Contactez-nous</h2>
                    <p className="text-center mb-12 max-w-3xl mx-auto">Vous avez des questions sur notre plateforme TMS ? N'hésitez pas à nous contacter pour en savoir plus ou pour organiser une démonstration.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="container mx-auto">
                            <form onSubmit={handleMessageSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={messageData.name}
                                    onChange={handleMessageChange}
                                    placeholder="Nom"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    value={messageData.subject}
                                    onChange={handleMessageChange}
                                    placeholder="Sujet"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={messageData.email}
                                    onChange={handleMessageChange}
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <textarea
                                    name="message"
                                    value={messageData.message}
                                    onChange={handleMessageChange}
                                    placeholder="Message"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                                    required
                                />
                                <button type="submit" className=" text-white px-6 py-2 rounded buttondash">Envoyer</button>
                            </form>
                        </div>
                        <div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Informations de contact</h3>
                                <div className="flex items-start mb-6">
                                    <div className="text-primary mr-4 mt-1">
                                        <i className="fas fa-map-marker-alt text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Adresse</h4>
                                        <p>123 Avenue de la Logistique, 75001 Paris, France</p>
                                    </div>
                                </div>
                                <div className="flex items-start mb-6">
                                    <div className="text-primary mr-4 mt-1">
                                        <i className="fas fa-phone text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Téléphone</h4>
                                        <p>+33 1 23 45 67 89</p>
                                    </div>
                                </div>
                                <div className="flex items-start mb-6">
                                    <div className="text-primary mr-4 mt-1">
                                        <i className="fas fa-envelope text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <p>contact@tms-solution.fr</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-primary mr-4 mt-1">
                                        <i className="fas fa-clock text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Heures d'ouverture</h4>
                                        <p>Lundi - Vendredi: 9h00 - 18h00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div>
                            <img src={assets.tms} alt="TMS Logo" className="h-10 mb-6" />
                            <p className="text-gray-400 mb-6">Notre système de gestion de transport (TMS) vous aide à optimiser votre chaîne logistique pour réduire les coûts et améliorer l'efficacité.</p>
                            <div className="flex">
                                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="footer-title">Liens rapides</h4>
                            <a href="#home" className="footer-link">Accueil</a>
                            <a href="#services" className="footer-link">Services</a>
                            <a href="#blog" className="footer-link">Blog</a>
                            <a href="#testimonials" className="footer-link">Témoignages</a>
                            <a href="#contact" className="footer-link">Contact</a>
                        </div>
                        <div>
                            <h4 className="footer-title">Services</h4>
                            <a href="#" className="footer-link">Transport de marchandises</a>
                            <a href="#" className="footer-link">Gestion logistique</a>
                            <a href="#" className="footer-link">Suivi en temps réel</a>
                            <a href="#" className="footer-link">Optimisation des routes</a>
                            <a href="#" className="footer-link">Analyse de données</a>
                        </div>
                        <div>
                            <h4 className="footer-title">Mentions légales</h4>
                            <a href="#" className="footer-link">Conditions générales</a>
                            <a href="#" className="footer-link">Politique de confidentialité</a>
                            <a href="#" className="footer-link">Mentions légales</a>
                            <a href="#" className="footer-link">Cookies</a>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
                        <p>&copy; 2023 TMS Solution. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={closeLoginModal}>&times;</span>
                        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

                        <form id="loginForm" onSubmit={handleSubmitLogin}>
                            <div className="mb-4">
                                <label htmlFor="loginEmail" className="block mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    className="form-input"
                                    placeholder="Votre email"
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4 password-toggle">
                                <label htmlFor="loginPassword" className="block mb-2 font-medium">Mot de passe</label>
                                <input
                                    type="password"
                                    id="loginPassword"
                                    className="form-input"
                                    placeholder="Votre mot de passe"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                    required
                                />
                                <i className="fas fa-eye toggle-password" data-target="loginPassword"></i>
                            </div>

                            {errorLogin && (
                                <p className="text-red-500 text-sm text-center mb-4">{errorLogin}</p>
                            )}

                            <button type="submit" className="btn-primary w-full mb-4">Se connecter</button>

                            <p className="text-center text-sm">
                                Vous n'avez pas de compte ?{" "}
                                <a href="#" onClick={() => { closeLoginModal(); openRegisterModal(); }} className="text-primary font-semibold">
                                    S'inscrire
                                </a>
                            </p>
                        </form>
                    </div>
                </div>

            )}

            {/* Register Modal */}
            {isRegisterModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={closeRegisterModal}>&times;</span>
                        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
                        <form id="registerForm" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-4">
                                <label htmlFor="username" className="block mb-2 font-medium">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Votre nom complet"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Votre email"
                                    required
                                />
                            </div>
                            <div className="mb-4 password-toggle">
                                <label htmlFor="password" className="block mb-2 font-medium">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Votre mot de passe"
                                    required
                                />
                                <i className="fas fa-eye toggle-password" data-target="password"></i>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block mb-2 font-medium">Image de profil</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="form-input"
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full ">S'inscrire</button>
                            <p className="text-center text-sm">
                                Vous avez déjà un compte ?{" "}
                                <a href="#" onClick={() => { closeRegisterModal(); openLoginModal(); }} className="text-primary font-semibold">
                                    Se connecter
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>

    );
};

export default TMS;
