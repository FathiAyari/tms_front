import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchReviewById, updateReview } from "../../../services/ReviewService.js";

const EditReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reviewData, setReviewData] = useState({
        message: "",
        review: "", // e.g., "bon", "moyenne", "mauvais"
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await fetchReviewById(id);
                setReviewData({
                    message: res.message || "",
                    review: res.review || "",
                });
            } catch (err) {
                toast.error("Erreur lors du chargement de l'avis.");
                navigate("/reviews");
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateReview(id, reviewData);
            toast.success("Avis modifié avec succès !");
            navigate("/reviews");
        } catch (err) {
            toast.error("Erreur lors de la modification de l'avis.");
        }
    };

    if (loading) {
        return <div className="text-center py-10">Chargement...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Modifier l'avis</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
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

                        <div>
                            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                                Note
                            </label>
                            <select
                                name="review"
                                id="review"
                                value={reviewData.review}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            >
                                <option value="">Sélectionner une note</option>
                                <option value="bon">Bon</option>
                                <option value="moyenne">Moyenne</option>
                                <option value="mauvais">Mauvais</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full my-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditReview;
