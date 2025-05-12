import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addPost } from "../../../services/PostsService.js";

const AddPost = () => {
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: null,
        author: JSON.parse(localStorage.getItem('user')).id,
    });

    // Handle text input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the file
        setPostData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("content", postData.content);
        formData.append("author", postData.author);
        formData.append("status", postData.status);
        if (postData.image) {
            formData.append("image", postData.image); // Ensure this is the file object
        }


        try {
            // Send FormData to the backend
            await addPost(formData);

            toast.success("Article ajouté avec succès !");
            navigate("/posts");
        } catch (err) {
            toast.error("Erreur lors de l'ajout de l'article.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Ajouter un article</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Titre
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={postData.title}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Contenu
                            </label>
                            <textarea
                                name="content"
                                id="content"
                                rows="6"
                                value={postData.content}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                            />
                        </div>

                        {/* Image File */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image (fichier)
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full"
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

export default AddPost;
