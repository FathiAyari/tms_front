import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMessageById } from '../../../services/MessagesService.js';

const MessageDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const data = await fetchMessageById(id);
                setMessage(data);
            } catch (error) {
                console.error('Erreur lors de la récupération du message :', error);
            }
        };

        getMessage();
    }, [id]);

    const handleBack = () => {
        navigate("/messages");
    };

    if (!message) {
        return <div className="p-4">Chargement du message...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={handleBack}
                className="mb-4 text-blue-600 hover:underline"
            >
                Retour
            </button>
            <div className="container mx-auto p-6">
                {/* Retour button aligned top-left */}


                <div className="bg-white shadow-md rounded-lg p-6 mx-5">
                    <h2 className="text-2xl font-semibold mb-6">Détails du message</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Nom</label>
                            <input
                                type="text"
                                value={message.name}
                                readOnly
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={message.email}
                                readOnly
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block font-medium text-gray-700 mb-1">Sujet</label>
                            <input
                                type="text"
                                value={message.subject}
                                readOnly
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                value={message.message}
                                readOnly
                                rows={6}
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block font-medium text-gray-700 mb-1">Envoyé le</label>
                            <input
                                type="text"
                                value={new Date(message.sentAt).toLocaleString()}
                                readOnly
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MessageDetails;
