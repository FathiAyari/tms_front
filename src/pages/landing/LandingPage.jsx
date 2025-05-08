import React, { useEffect, useState } from 'react';
import { assets } from "../../assets/assets.js";
import { FaUser } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import { fetchServices } from "../../services/ServicesService.js";
import { addMessage } from "../../services/MessagesService.js";
import {toast, ToastContainer} from "react-toastify";
import { fetchReviews } from "../../services/ReviewService.js";
import {useAuth} from "../../services/authContext.jsx";
import {incrementVisit} from "../../services/visitServices.js";  // Add the service for fetching reviews

export default function LandingPage() {
    const { user, logout } = useAuth(); // Get user and logout function

    const [service, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState({
        totalReviews: 0,
        avgRating: 0,
        positiveReviews: 0
    });
    const navigate = useNavigate();

    const [messageData, setMessageData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        console.log("useEffect triggered"); // Log every time the effect is triggered

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
                const avgRating = reviews.reduce((acc, review) => {
                    return acc + (review.review === "bon" ? 5 : review.review === "moyenne" ? 3 : 1);
                }, 0) / totalReviews;

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

        // Fetch services and reviews
        getServices();
        getReviews();

        // Increment visit count
        incrementVisit();
        console.log("incrementVisit called");

    }, []);  // Empty dependency array ensures this runs only once


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

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="loader" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen scroll-smooth">
            {/* Navbar */}
            <nav className="bg-orange-200 fixed w-full z-20 top-0 left-0">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-orange-500 font-bold text-xl">TMS</div>
                    <ul className="flex space-x-6 text-gray-700 font-medium">
                        <li><Link to="/blog" className="hover:text-orange-500">Blog</Link></li>
                        <li><a href="#contact" className="hover:text-orange-500">Contact</a></li>

                        {user ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">
                                        Dashboard
                                    </Link>
                                </li>

                            </>
                        ) : (
                            <li>
                                <Link to="/signin" className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">
                                    Connexion
                                </Link>
                            </li>
                        )}
                    </ul>

                </div>
            </nav>

            {/* Header */}
            <header className="h-[500px] text-white pt-16 relative">
                <img
                    src={assets.hero}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="z-10 relative flex flex-col justify-center items-center h-full bg-black bg-opacity-30">
                    <h1 className="text-5xl font-bold text-center leading-tight">
                        TRANSPORT<br /> MANAGEMENT<br /> SYSTEM
                    </h1>
                </div>
            </header>

            {/* Content */}
            <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Support intégré</h2>
                    <p className="text-gray-600 mb-6">
                        Notre logiciel couvre tous les aspects de la gestion du transport pour vous offrir une solution complète, intuitive et efficace.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Utilisez ce logiciel pour simplifier votre gestion quotidienne.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
                        En savoir plus
                    </button>
                </div>
                <div>
                    <img src={assets.truck} alt="Camion" className="rounded-xl shadow-lg w-full" />
                </div>
            </section>

            {/* Services */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {service.length > 0 ? (
                            service.map((item) => (
                                <div key={item._id} className="bg-gray-100 p-6 rounded-lg shadow text-center">
                                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                    <p className="text-gray-600">{item.notes}</p>
                                    <p className="text-sm text-gray-500 mt-2 italic">Région: {item.region}</p>
                                    <p className="text-sm text-gray-400 mt-1">Ajouté le: {new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center col-span-3">Aucun service trouvé.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Reviews Statistics Section */}
            <section className="bg-orange-100 py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Statistiques des Avis</h2>

                    {/* First Counter: Total Reviews */}
                    <div className="flex justify-center gap-12 mb-8">
                        <div className="text-center">
                            <p className="text-6xl font-extrabold text-orange-500">{reviewStats.totalReviews}</p>
                            <p className="text-gray-700">Avis totaux</p>
                        </div>

                        {/* Second Counter: Average Rating */}
                        <div className="text-center">
                            <p className="text-6xl font-extrabold text-orange-500">{reviewStats.avgRating}</p>
                            <p className="text-gray-700">Note moyenne</p>
                        </div>

                        {/* Third Counter: Positive Reviews */}
                        <div className="text-center">
                            <p className="text-6xl font-extrabold text-orange-500">{reviewStats.positiveReviews}</p>
                            <p className="text-gray-700">Avis positifs</p>
                        </div>
                    </div>

                    <p className="text-gray-700">Nos clients sont satisfaits de nos services, et nous continuons à nous améliorer chaque jour.</p>
                </div>
            </section>


            {/* Why Choose Us */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Pourquoi nous choisir ?</h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Suivi des véhicules en temps réel</li>
                            <li>Outils de rapports automatisés</li>
                            <li>Solutions logistiques économiques</li>
                            <li>Infrastructure évolutive</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Client Reviews */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Avis de Nos Clients</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow space-y-4">
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center space-x-2">
                                            <FaUser className="text-orange-500" />
                                            <span className="font-semibold text-orange-500">{review.user.username}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-600 italic">"{review.message}"</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center col-span-3">Aucun avis trouvé.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="bg-gray-200 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Contactez-nous</h2>
                    <p className="text-gray-700 text-center mb-8">Demandez un devis, un support ou des informations supplémentaires.</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <form onSubmit={handleMessageSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
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
                                placeholder="E-mail"
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
                            ></textarea>
                            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Envoyer</button>
                        </form>

                        {/* Map */}
                        <div className="w-full h-64 md:h-auto">
                            <iframe
                                title="Carte"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509847!2d144.9537353153181!3d-37.81627937975192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e2a8e3d8d6f2!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611813474027!5m2!1sen!2sus"
                                className="w-full h-full border-0 rounded-lg shadow"
                                allowFullScreen="true"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}
