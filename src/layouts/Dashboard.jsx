import {
  FaBook,
  FaBoxOpen,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaParachuteBox,
  FaThumbsUp,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { RiMenuFold4Line } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsPersonBoundingBox } from "react-icons/bs";
import useIsAdmin from "./../hooks/useIsAdmin";
import useIsDeliveryman from "./../hooks/useIsDeliveryman";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import logo from "../assets/icons/timely-logo.png";
import useTheme from "./../hooks/useTheme";

const Dashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isAdmin] = useIsAdmin();
  const [isDeliveryman] = useIsDeliveryman();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sm:flex font-display">
      {/* sidbar open icon for small device */}
      <button
        className="md:hidden fixed top-4 right-4 text-text"
        onClick={() => setOpenSidebar(true)}
        aria-label="Open Sidebar"
      >
        <RiMenuFold4Line size={24} />
      </button>
      {/* dashboard side bar */}
      <aside
        className={`min-h-screen absolute md:static z-10 transition-all duration-300 ${
          openSidebar
            ? "overflow-visible w-full bg-[#00000050]"
            : "overflow-hidden"
        }`}
      >
        {/* sidebar close icon */}
        <button
          className={`rounded-full text-accent lg:hidden bg-text border-none absolute top-0 right-0 m-4 ${
            openSidebar ? "visible" : "hidden"
          }`}
          onClick={() => setOpenSidebar(false)}
          aria-label="Close Sidebar"
        >
          <IoCloseCircleOutline size={32} />
        </button>

        {/* Navigation links for dashboard user of different roles */}
        <ul
          className={`menu overflow-y-auto flex-nowrap transition-all duration-300 sm:p-4 h-full md:w-52 lg:w-64 overflow-hidden absolute md:static z-50 bg-primary-400 backdrop-blur-md ${
            openSidebar ? "w-52 sm:w-64 p-4" : "w-0 p-0"
          }`}
        >
          <div className="flex gap-6 items-center mb-6">
            {/* Logo linked to homepage */}
            <Link to="/" className="text-text flex gap-2 items-center">
              <img
                className="w-8 sm:w-10 object-cover"
                src={logo}
                alt="logo of timely app"
                aria-label="timely website logo"
                />
                <span className="font-bold text-lg">Timely</span>
            </Link>
            {/* theme toggle button */}
            <div
              className="text-2xl cursor-pointer"
              onClick={() => toggleTheme()}
            >
              {theme === "dark" ? (
                <HiOutlineLightBulb className="text-yellow-400" />
              ) : (
                <MdOutlineDarkMode />
              )}
            </div>
          </div>

          {/* routes for different users */}
          {isAdmin ? (
            // admin routes
            <>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/adminDashboard"
                >
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/allParcels"
                >
                  <FaBoxOpen></FaBoxOpen>
                  All Parcels
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/allUsers"
                >
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/allDeliveryman"
                >
                  <BsPersonBoundingBox></BsPersonBoundingBox>
                  All Deliveryman
                </NavLink>
              </li>
            </>
          ) : isDeliveryman ? (
            // deliveryman routes
            <>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/userProfile"
                >
                  <BsPersonBoundingBox></BsPersonBoundingBox>
                  My Profile
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/myDeliveryList"
                >
                  <FaList></FaList>
                  My Delivery List
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/myReviews"
                >
                  <FaThumbsUp></FaThumbsUp>
                  My Reviews
                </NavLink>
              </li>
            </>
          ) : (
            // user routes
            <>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/userProfile"
                >
                  <BsPersonBoundingBox></BsPersonBoundingBox>
                  User Profile
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/bookParcel"
                >
                  <FaCalendar></FaCalendar>
                  Book a Parcel
                </NavLink>
              </li>
              <li className="" onClick={() => setOpenSidebar(false)}>
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses =
                      "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                    const activeClasses = isActive ? "bg-primary-400" : "";
                    return `${baseClasses} ${activeClasses}`;
                  }}
                  to="/dashboard/myParcels"
                >
                  <FaParachuteBox></FaParachuteBox>
                  My Parcels
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <hr className="border-primary-600" />
          <li className="" onClick={() => setOpenSidebar(false)}>
            <NavLink
              className={({ isActive }) => {
                const baseClasses =
                  "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                const activeClasses = isActive ? "bg-primary-400" : "";
                return `${baseClasses} ${activeClasses}`;
              }}
              to="/"
            >
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li className="" onClick={() => setOpenSidebar(false)}>
            <NavLink
              className={({ isActive }) => {
                const baseClasses =
                  "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                const activeClasses = isActive ? "bg-primary-400" : "";
                return `${baseClasses} ${activeClasses}`;
              }}
              to="/aboutus"
            >
              <FaBook></FaBook>
              About
            </NavLink>
          </li>
          <li className="" onClick={() => setOpenSidebar(false)}>
            <NavLink
              className={({ isActive }) => {
                const baseClasses =
                  "hover:bg-primary-400 rounded-lg p-2 my-2 text-text flex items-center gap-2";
                const activeClasses = isActive ? "bg-primary-400" : "";
                return `${baseClasses} ${activeClasses}`;
              }}
              to="/contactus"
            >
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </aside>
      {/* dashboard content */}
      <div className="flex-1 p-4 md:p-8 pt-20 tex-text">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
