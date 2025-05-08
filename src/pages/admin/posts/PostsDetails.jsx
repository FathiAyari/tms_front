import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById } from '../../../services/PostsService';
import { backendURL } from '../../../services/api';

const PostsDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const data = await fetchPostById(id);
                setPost(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du post :", error);
            }
        };

        getPost();
    }, [id]);

    const handleBack = () => {
        navigate("/posts");
    };

    if (!post) {
        return <div className="p-4">Chargement du post...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={handleBack}
                className="mb-4 text-blue-600 hover:underline"
            >
                Retour
            </button>

            <div className="bg-white shadow-md rounded-lg p-6 mx-5">
                <h2 className="text-2xl font-semibold mb-6">Détails du publication</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Titre</label>
                        <input
                            type="text"
                            value={post.title}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Auteur</label>
                        <input
                            type="text"
                            value={post.author?.username || post.author}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Statut</label>
                        <input
                            type="text"
                            value={post.status}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Publié le</label>
                        <input
                            type="text"
                            value={new Date(post.publishedAt).toLocaleString()}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block font-medium text-gray-700 mb-1">Contenu</label>
                        <textarea
                            value={post.content}
                            readOnly
                            rows={6}
                            className="w-full p-2 border rounded-md bg-gray-100"
                        />
                    </div>

                    {post.image && (
                        <div className="sm:col-span-2 mt-4">
                            <label className="block font-medium text-gray-700 mb-1">Image</label>
                            <img
                                src={`${backendURL}/api${post.image}`}
                                alt="Post"
                                className="w-full max-h-96 object-cover rounded-md border"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostsDetails;
