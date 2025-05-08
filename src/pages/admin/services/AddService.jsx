import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addService } from "../../../services/ServicesService.js";

const AddService = () => {
    const navigate = useNavigate();

    const [serviceData, setServiceData] = useState({
        name: "",
        notes: "",
        region: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addService(serviceData);
            toast.success("Service ajouté avec succès !");
            navigate("/services");
        } catch (err) {
            toast.error("Erreur lors de l'ajout du service.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Ajouter un service</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nom du service
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={serviceData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            />
                        </div>

                        {/* Region */}
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                Région
                            </label>
                            <input
                                type="text"
                                name="region"
                                id="region"
                                value={serviceData.region}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                Remarques
                            </label>
                            <textarea
                                name="notes"
                                id="notes"
                                rows="4"
                                value={serviceData.notes}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full my-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
