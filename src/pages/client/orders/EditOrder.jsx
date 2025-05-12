import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrderById, updateOrder } from "../../../services/OrdersService.js";
import { toast } from "react-toastify";

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true); // Admin can edit the status and adminNotes field
    }

    const getOrder = async () => {
      const data = await fetchOrderById(id);
      setOrder(data);
      setStatus(data.status); // Set the initial status of the order
    };

    getOrder();
  }, [id]);

  const handleBack = () => {
    navigate("/orders");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(id, { ...order, status });
      toast.success("Commande mise à jour avec succès!");
      navigate("/orders");
    } catch (err) {
      toast.error("Erreur lors de la mise à jour de la commande.");
    }
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
          <h2 className="text-2xl font-semibold mb-6">Modifier une commande</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du client
                </label>
                <input
                    type="text"
                    name="customerName"
                    value={order.customerName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Source Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adresse de départ
                </label>
                <input
                    type="text"
                    name="sourceAdress"
                    value={order.sourceAdress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Destination Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adresse de destination
                </label>
                <input
                    type="text"
                    name="destinationAdress"
                    value={order.destinationAdress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Source Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pays d'origine
                </label>
                <input
                    type="text"
                    name="sourceCountry"
                    value={order.sourceCountry}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Destination Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pays de destination
                </label>
                <input
                    type="text"
                    name="destinationCountry"
                    value={order.destinationCountry}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Méthode de paiement
                </label>
                <input
                    type="text"
                    name="paymentMethod"
                    value={order.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Statut du paiement
                </label>
                <input
                    type="text"
                    name="paymentStatus"
                    value={order.paymentStatus}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Total Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Montant total (€)
                </label>
                <input
                    type="number"
                    name="totalAmount"
                    value={order.totalAmount}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Poids
                </label>
                <input
                    type="number"
                    name="weight"
                    value={order.weight}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Remarques
                </label>
                <textarea
                    name="notes"
                    rows="3"
                    value={order.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              {/* Type of Item */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type d'article
                </label>
                <select
                    name="type"
                    value={order.type}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                >
                  <option value="Standard">Standard</option>
                  <option value="Fragile">Fragile</option>
                  <option value="Périssable">Périssable</option>
                  <option value="Électronique">Électronique</option>
                  <option value="Documents">Documents</option>
                  <option value="Vêtements">Vêtements</option>
                  <option value="Meubles">Meubles</option>
                  <option value="Produits chimiques">Produits chimiques</option>
                  <option value="Lourd">Lourd</option>
                  <option value="Volumineux">Volumineux</option>
                </select>
              </div>

              {/* Admin Notes - Editable only for Admin */}
              {isAdmin && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Remarques de l'administrateur
                    </label>
                    <textarea
                        name="adminNotes"
                        rows="3"
                        value={order.adminNotes || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                  </div>
              )}

              {/* Status - Editable only for Admin */}
              {isAdmin && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Statut de la commande
                    </label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                    >
                      <option value="En attente">En attente</option>
                      <option value="Confirmée">Confirmée</option>
                      <option value="Livrée">Livrée</option>
                      <option value="Annulée">Annulée</option>
                    </select>
                  </div>
              )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full my-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Mettre à jour
            </button>
          </form>
        </div>
      </div>
  );
}

export default EditOrder;
