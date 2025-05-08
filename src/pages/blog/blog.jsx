import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineArrowLeft } from "react-icons/ai";
import { fetchPosts } from "../../services/PostsService.js";
import { useNavigate } from "react-router-dom";
import "../../assets/css/loader.css";
import { backendURL } from "../../services/api.js";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatDate = (iso) => {
        const date = new Date(iso);
        return isNaN(date.getTime())
            ? "Date invalide"
            : date.toLocaleString("fr-FR", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await fetchPosts("", "accepté");
                setPosts(data.posts || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="loader" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
            {/* Header */}
            <div className="w-full max-w-md mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-sm text-blue-600 hover:underline"
                >
                    <AiOutlineArrowLeft className="mr-1" />
                    Retour
                </button>
                <h1 className="text-2xl font-bold text-gray-800 mt-4">Bienvenue sur le blog</h1>
                <p className="text-gray-500 text-sm">Découvrez les dernières publications approuvées.</p>
            </div>

            {/* Posts */}
            <div className="w-full max-w-md space-y-6">
                {posts.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-lg shadow">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No Posts"
                            className="w-24 h-24 mx-auto mb-4 opacity-70"
                        />
                        <h2 className="text-lg font-semibold text-gray-700">Aucun post accepté</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Les publications apparaîtront ici une fois qu'elles auront été approuvées.
                        </p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
                        >
                            {/* Post Header */}
                            <div className="flex items-center px-4 py-3 border-b">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <AiOutlineUser className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{post.author?.username || "Anonyme"}</p>
                                    <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-4 py-3">
                                <p className="text-sm text-gray-800">
                                    {post.content}
                                </p>
                            </div>

                            {/* Image */}
                            {post.image && (
                                <img
                                    src={`${backendURL}/api${post.image}`}
                                    alt="post"
                                    className="w-full max-h-80 object-cover"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Blog;
