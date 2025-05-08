import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addReview } from "../../../services/ReviewService.js";

const AddReview = () => {
    const navigate = useNavigate();

    // Replace this with the actual user ID you want to hardcode

    const [reviewData, setReviewData] = useState({
        user:  JSON.parse(localStorage.getItem("user")).id,
        message: "",
        review: "bon",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReview(reviewData);
            toast.success("Avis ajouté avec succès !");
            navigate("/reviews");
        } catch (err) {
            toast.error("Erreur lors de l'ajout de l'avis.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Ajouter un avis</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                value={reviewData.message}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            />
                        </div>

                        {/* Review */}
                        <div>
                            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                                Évaluation
                            </label>
                            <select
                                name="review"
                                id="review"
                                value={reviewData.review}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            >
                                <option value="bon">Bon</option>
                                <option value="moyen">Moyen</option>
                                <option value="mauvais">Mauvais</option>
                            </select>
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

export default AddReview;
