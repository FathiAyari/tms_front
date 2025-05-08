import {
  FaTruck,
  FaCheck,
  FaUndo,
  FaEye,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import ClientLayout from "../../../components/layouts/UserLayout.jsx";
import api from "../../../services/api";
import {fetchDashboardData} from "../../../services/DashboardServices.js"; // Make sure this points to your axios config

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    enAttenteColis: 0,
    confirmeeColis: 0,
    livreColis: 0,
    annuleeColis: 0,
    reviews: 0,
    posts: 0,
    publications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        console.log("userId ", userId);
        if (!userId) return;

        const data = await fetchDashboardData(userId);

        setStats({
          enAttenteColis: data.orders.enAttenteColis,
          confirmeeColis: data.orders.confirmeeColis,
          livreColis: data.orders.livreColis,
          annuleeColis: data.orders.annuleeColis,
          reviews: data.reviews,
          posts: data.posts,
          publications: data.posts, // Assuming publications = posts
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Colis en Attente", value: stats.enAttenteColis, color: "bg-yellow-500", icon: <FaEye /> },
    { label: "Colis Confirmée", value: stats.confirmeeColis, color: "bg-blue-500", icon: <FaTruck /> },
    { label: "Colis Livrée", value: stats.livreColis, color: "bg-green-500", icon: <FaCheck /> },
    { label: "Colis Annulée", value: stats.annuleeColis, color: "bg-red-500", icon: <FaUndo /> },
    { label: "Reviews", value: stats.reviews, color: "bg-purple-500", icon: <FaUser /> },
    { label: "Publications", value: stats.publications, color: "bg-orange-500", icon: <FaEnvelope /> },
  ];

  return (
      <ClientLayout>
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-7">Dashboard Transport</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`${card.color} p-3 rounded-full`}>
                      <div className="text-white text-2xl">{card.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{card.label}</h3>
                      <p className="text-2xl font-bold text-gray-600">{card.value}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </ClientLayout>
  );
};

export default ClientDashboard;
