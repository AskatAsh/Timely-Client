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
import { NavLink, Outlet } from "react-router-dom";
//   import useIsAdmin from "../Hooks/useIsAdmin";
import { useState } from "react";
import { RiMenuFold4Line } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsPersonBoundingBox } from "react-icons/bs";
import useIsAdmin from './../hooks/useIsAdmin';
import { ModalContainer } from "reoverlay";
import useIsDeliveryman from './../hooks/useIsDeliveryman';

const Dashboard = () => {
  // const [isAdmin] = useIsAdmin();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isAdmin] = useIsAdmin();
  const [isDeliveryman] = useIsDeliveryman();

  return (
    <div className="sm:flex">
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
          openSidebar ? "overflow-visible w-full bg-[#00000050]" : "overflow-hidden"
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
        <ul
          className={`menu overflow-y-auto flex-nowrap transition-all duration-300 sm:p-4 h-full md:w-52 lg:w-64 overflow-hidden absolute md:static z-50 bg-primary-400 backdrop-blur-md ${
            openSidebar ? "w-52 sm:w-64 p-4" : "w-0 p-0"
          }`}
        >
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
                  to="/dashboard/myDeliverList"
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
              to="/about"
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
              to="/shop/contact"
            >
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </aside>
      {/* dashboard content */}
      <div className="flex-1 p-4 md:p-8 pt-20">
        <Outlet></Outlet>
        <ModalContainer />
      </div>
    </div>
  );
};

export default Dashboard;
