import { NavLink, Outlet } from "react-router";
import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUtensils,
  FaVoicemail,
} from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";

const Dashboard = () => {
  const isAdmin = true;
  
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-300 shadow-xl flex flex-col">
        {/* Logo / Header */}
        <div className="p-5 text-center text-2xl font-bold text-white border-b border-gray-700">
          My Dashboard
        </div>

        {/* Nav Links */}
        <ul className="menu p-4 flex-1 space-y-1">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome" className={navLinkClasses}>
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProducts" className={navLinkClasses}>
                  <FaUtensils /> Add Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems" className={navLinkClasses}>
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBooking" className={navLinkClasses}>
                  <FiCheckSquare /> Manage Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" className={navLinkClasses}>
                  <FaUser /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/reservation" className={navLinkClasses}>
                  <FaCalendar />My Profile Page
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review" className={navLinkClasses}>
                  <FaAd /> Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={navLinkClasses}
                >
                  <FaList /> My Products
                </NavLink>
              </li>
            </>
          )}

          <div className="divider my-4 border-gray-700"></div>

          {/* Shared Links */}
          <li>
            <NavLink to="/" className={navLinkClasses}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className={navLinkClasses}>
              <FaSearch /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact" className={navLinkClasses}>
              <FaVoicemail /> Contact
            </NavLink>
          </li>
        </ul>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-800">
          © {new Date().getFullYear()} Your Company
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
