import {FaTachometerAlt, FaCar, FaListAlt, FaInbox} from "react-icons/fa"; // Import icons
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#FBFBFB] text-[#515151] w-52 min-h-screen p-6 border-r border-gray-300">
      <div className="mb-8 flex flex-col items-center space-y-2">
        <NavLink to="/">
          <div className="bg-gradient-to-r from-[#596ef9] to-[#3C7BE5] text-white text-3xl font-extrabold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
            TMS
          </div>
        </NavLink>
      </div>

      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"
              }`
            }
          >
            <FaTachometerAlt className="text-xl" />
            <span className="text-sm font-semibold">Tableau de bord</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-vechile"
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"
              }`
            }
          >
            <FaCar className="text-xl" />
            <span className="text-sm font-semibold">Add Vehicle</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/vechiles"
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"
              }`
            }
          >
            <FaListAlt className="text-xl" />
            <span className="text-sm font-semibold">Les commandes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dd"
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"
              }`
            }
          >
            <FaInbox className="text-xl" />
            <span className="text-sm font-semibold">Les Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dds"
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"
              }`
            }
          >
            <FaListAlt className="text-xl" />
            <span className="text-sm font-semibold">Les Publications</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
