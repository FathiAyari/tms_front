import AdminSidebar from './components/admin/AdminSidebar.jsx';
import Navbar from '../Navbar';
import { ToastContainer } from 'react-toastify';
import ClientSidebar from "./components/user/ClientSidebar.jsx";

const ClientLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* AdminSidebar */}
            <div className="w-52 h-full fixed bg-gray-800 z-20">
                <ClientSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-52 flex flex-col">
                {/* Navbar */}
                <div className="flex-shrink-0 w-full z-10">
                    <Navbar />
                </div>

                {/* Content Area */}
                <div className="flex-1  overflow-y-auto ">
                    {/* Rendering children directly */}
                    {children}
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default ClientLayout;
