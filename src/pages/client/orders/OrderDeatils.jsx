import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrderById } from "../../../services/OrdersService.js";

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            const data = await fetchOrderById(id);
            setOrder(data);
        };
        getOrder();
    }, [id]);

    const handleBack = () => {
        navigate("/orders");
    };

    if (!order) return <p className="p-6">Chargement...</p>;

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={handleBack}
                className="text-blue-600 mb-4 hover:underline"
            >
                Retour
            </button>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Détails de la commande</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom du client</label>
                        <p className="mt-1 text-gray-900">{order.ownerId.username}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Destinateur</label>
                        <p className="mt-1 text-gray-900">{order.customerName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Destination</label>
                        <p className="mt-1 text-gray-900">{order.destination}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Méthode de paiement</label>
                        <p className="mt-1 text-gray-900">{order.paymentMethod}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Statut du paiement</label>
                        <p className="mt-1 text-gray-900">{order.paymentStatus}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Montant total (€)</label>
                        <p className="mt-1 text-gray-900">{order.totalAmount}</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Remarques</label>
                        <p className="mt-1 text-gray-900 whitespace-pre-wrap">{order.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
