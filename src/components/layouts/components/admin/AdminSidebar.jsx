import {
  FaTachometerAlt,
  FaCar,
  FaListAlt,
  FaInbox,
  FaUserAltSlash,
  FaUserAlt,
  FaRegMoneyBillAlt
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
      <div className="bg-[#FBFBFB] text-[#515151] w-52 h-screen overflow-y-auto p-6 border-r border-gray-300">
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
                to="/dashboard"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaTachometerAlt className="text-xl" />
              <span className="text-sm font-semibold">Tableau de bord</span>
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/orders"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaListAlt className="text-xl" />
              <span className="text-sm font-semibold">Commandes</span>
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/clients"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaUserAlt className="text-xl" />
              <span className="text-sm font-semibold">Les Clients</span>
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/services"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaRegMoneyBillAlt className="text-xl" />
              <span className="text-sm font-semibold">Services</span>
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/messages"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaInbox className="text-xl" />
              <span className="text-sm font-semibold">Messages</span>
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/posts"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaListAlt className="text-xl" />
              <span className="text-sm font-semibold">Publications</span>
            </NavLink>
          </li>



          <li>
            <NavLink
                to="/reviews"
                className={({ isActive }) =>
                    `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                        isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                }
            >
              <FaListAlt className="text-xl" />
              <span className="text-sm font-semibold">Sondage</span>
            </NavLink>
            <li>
              <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                      `p-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                          isActive ? "bg-[#DDE1FF] text-[#2F4BFF]" : "hover:bg-[#F2F3FF]"}`
                  }
              >
                <FaListAlt className="text-xl" />
                <span className="text-sm font-semibold">Profile</span>
              </NavLink>
            </li>
          </li>
        </ul>
      </div>
  );
};

export default AdminSidebar;
