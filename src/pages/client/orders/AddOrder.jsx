import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../../services/OrdersService.js";
import { toast } from "react-toastify";

const AddOrder = () => {
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState({
        customerName: "",
        ownerId: JSON.parse(localStorage.getItem("user")).id,
        status: "En attente",
        destination: "",
        paymentMethod: "Carte",
        paymentStatus: "Non payé",
        totalAmount: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addOrder(orderData);
            toast.success("Commande ajoutée avec succès !", { autoClose: 1500 });
            navigate("/orders");
        } catch (err) {
            toast.error("Erreur lors de l'ajout de la commande.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Ajouter une commande</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom du client</label>
                        <input
                            name="customerName"
                            value={orderData.customerName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adresse du client</label>
                        <input
                            name="destination"
                            value={orderData.destination}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Méthode de paiement</label>
                        <select
                            name="paymentMethod"
                            value={orderData.paymentMethod}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        >
                            <option value="Carte">Carte</option>
                            <option value="Espèces">Espèces</option>
                            <option value="Chèque">Chèque</option>
                            <option value="Virement">Virement</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Statut du paiement</label>
                        <select
                            name="paymentStatus"
                            value={orderData.paymentStatus}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        >
                            <option value="Payé">Payé</option>
                            <option value="Partiellement payé">Partiellement payé</option>
                            <option value="Non payé">Non payé</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Montant total (€)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="totalAmount"
                            value={orderData.totalAmount}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Remarques</label>
                        <textarea
                            name="notes"
                            rows="3"
                            value={orderData.notes}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="md:col-span-2 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOrder;
