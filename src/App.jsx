// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn.jsx';
import SignUp from './pages/Authentication/SignUp.jsx';
import Inactive from './pages/Authentication/inactive.jsx';
import NotFound from './components/NotFound.jsx';

import AdminDashboard from './pages/admin/dashboard/AdminDashboard.jsx';
import AdminLayout from './components/layouts/AdminLayout.jsx';
import Messages from './pages/admin/messages/AdminMessages.jsx';
import MessageDetails from './pages/admin/messages/MessageDetails.jsx';
import AdminServices from './pages/admin/services/AdminServices.jsx';
import AddService from './pages/admin/services/AddService.jsx';
import EditService from './pages/admin/services/EditService.jsx';
import AdminOrders from './pages/admin/orders/AdminOrders.jsx';
import AdminPosts from './pages/admin/posts/AdminPosts.jsx';
import AdminReviews from './pages/admin/reviews/AdminReviews.jsx';

import ClientDashboard from './pages/client/ClientDashboard/ClientDashboard.jsx';
import ClientLayout from './components/layouts/UserLayout.jsx';
import AddOrder from './pages/client/orders/AddOrder.jsx';
import ClientOrders from './pages/client/orders/ClientOrders.jsx';
import EditOrder from './pages/client/orders/EditOrder.jsx';
import OrderDeatils from './pages/client/orders/OrderDeatils.jsx';
import ClientPosts from './pages/client/posts/ClientPosts.jsx';
import AddPost from './pages/client/posts/AddPost.jsx';
import PostsDetails from './pages/admin/posts/PostsDetails.jsx';
import Blog from './pages/blog/blog.jsx';
import ClientReviews from './pages/client/reviews/ClientReviews.jsx';
import AddReview from './pages/client/reviews/AddReview.jsx';
import EditReview from './pages/client/reviews/EditReview.jsx';

import { useAuth } from './services/authContext.jsx';
import AdminClients from "./pages/admin/clients/AdminClients.jsx";
import ClientProfile from "./pages/client/profil/ClientProfile.jsx";
import HomePage from "./pages/landing/HomePage.jsx";

const AppRoutes = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="text-center mt-20 text-lg">Chargement...</div>;

    const isAdmin = user?.role === 'admin';
    const isClient = user?.role === 'client';
    const isActive = user?.status === 'active';

    const publicPathsForInactive = ['/', '/blog', '/inactive'];

    // ✅ Redirect inactive users if not accessing allowed public paths
    if (user && !isActive && !publicPathsForInactive.includes(location.pathname)) {
        return <Navigate to="/inactive" replace />;
    }

    return (
        <Routes>
            {/* Admin Routes */}
            {isAdmin && isActive && (
                <>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/messages" element={<AdminLayout><Messages /></AdminLayout>} />
                    <Route path="/details-message/:id" element={<AdminLayout><MessageDetails /></AdminLayout>} />
                    <Route path="/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
                    <Route path="/add-service" element={<AdminLayout><AddService /></AdminLayout>} />
                    <Route path="/edit-service/:id" element={<AdminLayout><EditService /></AdminLayout>} />
                    <Route path="/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
                    <Route path="/edit-order/:id" element={<AdminLayout><EditOrder /></AdminLayout>} />
                    <Route path="/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
                    <Route path="/posts" element={<AdminLayout><AdminPosts /></AdminLayout>} />
                    <Route path="/clients" element={<AdminLayout><AdminClients /></AdminLayout>} />
                    <Route path="/details-post/:id" element={<AdminLayout><PostsDetails /></AdminLayout>} />
                    <Route path="/details-order/:id" element={<AdminLayout><OrderDeatils /></AdminLayout>} />
                    <Route path="/profile" element={<AdminLayout><ClientProfile /></AdminLayout>} />

                </>

            )}

            {/* Client Routes */}
            {isClient && isActive && (
                <>
                    <Route path="/dashboard" element={<ClientDashboard />} />
                    <Route path="/add-order" element={<ClientLayout><AddOrder /></ClientLayout>} />
                    <Route path="/orders" element={<ClientLayout><ClientOrders /></ClientLayout>} />
                    <Route path="/edit-order/:id" element={<ClientLayout><EditOrder /></ClientLayout>} />
                    <Route path="/details-order/:id" element={<ClientLayout><OrderDeatils /></ClientLayout>} />
                    <Route path="/posts" element={<ClientLayout><ClientPosts /></ClientLayout>} />
                    <Route path="/add-post" element={<ClientLayout><AddPost /></ClientLayout>} />
                    <Route path="/details-post/:id" element={<ClientLayout><PostsDetails /></ClientLayout>} />
                    <Route path="/reviews" element={<ClientLayout><ClientReviews /></ClientLayout>} />
                    <Route path="/add-review" element={<ClientLayout><AddReview /></ClientLayout>} />
                    <Route path="/edit-review/:id" element={<ClientLayout><EditReview /></ClientLayout>} />
                    <Route path="/profile" element={<ClientLayout><ClientProfile /></ClientLayout>} />
                </>
            )}

            {/* Public / Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/inactive" element={<Inactive />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

const App = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default App;
