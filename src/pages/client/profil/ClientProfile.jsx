import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '../../../services/UserServices';
import {backendURL} from "../../../services/api.js"; // Adjust the path as needed

const ClientProfile = () => {
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        role: '',
        status: '',
        image: '' // assuming backend provides image URL or path
    });

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        profileImage: null
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            const { id, username, email, role, status, image } = storedUser;
            setUser({ id, username, email, role, status, image });
            setFormData({
                username,
                email,
                currentPassword: '',
                newPassword: '',
                profileImage: null
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            setFormData((prev) => ({
                ...prev,
                profileImage: files[0]
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.currentPassword) {
            toast.error("Le mot de passe actuel est requis pour modifier le profil.");
            return;
        }

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('currentPassword', formData.currentPassword);
        data.append('newPassword', formData.newPassword);
        if (formData.profileImage) {
            data.append('image', formData.profileImage);
        }

        try {
            const { user: updatedUserData, message } = await updateUser(user.id, data);

            toast.success(message || "Profil mis à jour avec succès.");

            const updatedUser = {
                ...user,
                username: updatedUserData.username,
                email: updatedUserData.email,
                image: updatedUserData.image // ensure your backend returns this
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setFormData((prev) => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                profileImage: null
            }));
        } catch (err) {
            toast.error(err.message || "Erreur lors de la mise à jour.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modifier le Profil</h2>

            {/* Profile Image Preview */}
            <div className="flex items-center mb-4">
                {user.image && (
                    <img
                        src={`${backendURL}/api${user.image}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover mr-4 border"
                    />
                )}
                <div>
                    <label className="block font-medium text-gray-600 mb-1">Changer l'image</label>
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-600">Nom d'utilisateur</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600">Mot de passe actuel</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600">Nouveau mot de passe</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                        placeholder="Laisser vide pour ne pas changer"
                    />
                </div>

                <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">ID: <span className="text-gray-800">{user.id}</span></div>
                    <div className="text-sm text-gray-600">Rôle: <span className="text-gray-800">{user.role}</span></div>
                    <div className="text-sm text-gray-600">Statut: <span className="text-gray-800 capitalize">{user.status}</span></div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    );
};

export default ClientProfile;
