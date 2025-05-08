import {
  FaTruck,
  FaCheck,
  FaUndo,
  FaStore,
  FaEye,
  FaUsers,
  FaEnvelope,
  FaServer,
  FaPen, // New icon for posts/publications
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/AdminLayout.jsx";
import { fetchDashboardData } from "../../../services/DashboardServices.js"; // This must support no userId

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    enAttenteColis: 0,
    confirmeeColis: 0,
    livreColis: 0,
    annuleeColis: 0,
    posts: 0,
    reviews: 0,
    vues: 0,
    clients: 0,
    messages: 0,
    services: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchDashboardData(); // No userId passed for admin/global
        setStats({
          enAttenteColis: data.orders.enAttenteColis,
          confirmeeColis: data.orders.confirmeeColis,
          livreColis: data.orders.livreColis,
          annuleeColis: data.orders.annuleeColis,
          posts: data.posts,
          reviews: data.reviews,
          vues: data.views, // Placeholder or fetch from backend if available
          clients: data.clients, // Placeholder or fetch from backend if available
          messages: data.messages, // Placeholder or fetch from backend if available
          services: data.services, // Placeholder or fetch from backend if available
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
    { label: "Nombre de Vues", value: stats.vues, color: "bg-blue-500", icon: <FaEye /> },
    { label: "Clients", value: stats.clients, color: "bg-green-500", icon: <FaUsers /> },
    { label: "Messages", value: stats.messages, color: "bg-red-500", icon: <FaEnvelope /> },
    { label: "Services", value: stats.services, color: "bg-yellow-500", icon: <FaServer /> },
    { label: "Publications", value: stats.posts, color: "bg-purple-500", icon: <FaPen /> }, // New publications card
  ];

  return (
      <Layout>
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-7">Dashboard Admin</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
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
      </Layout>
  );
};

export default AdminDashboard;
