import { useContext, useEffect, useState } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import notificaionIcon from "../../../src/assets/icons/notification.png";
import logo from "../../../src/assets/icons/timely-logo.png";
import { AuthContext } from "../../providers/AuthProvider";
// import { Bounce, toast } from "react-toastify";
import useTheme from "./../../hooks/useTheme";
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Button } from "../ui/button";
import { Bounce, toast } from "react-toastify";
import useIsAdmin from "./../../hooks/useIsAdmin";
import useIsDeliveryman from "./../../hooks/useIsDeliveryman";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [isAdmin] = useIsAdmin();
  const [isDeliveryman] = useIsDeliveryman();

  // logout handler
  const handleLogOut = () => {
    setIsUserMenuOpen(false);
    logOut()
      .then(() => {
        toast.success("Logged out Successfully.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const topScroll = window.scrollY;
      setIsSticky(topScroll > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // menu links
  const navlinks = (
    <>
      <NavLink
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "text-primary"
            : "hover:text-primary transition-all duration-200"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/contact"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "text-primary"
            : "hover:text-primary transition-all duration-200"
        }
      >
        Contact Us
      </NavLink>
      <NavLink
        to="/about"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "text-primary"
            : "hover:text-primary transition-all duration-200"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/auth/signup"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "text-primary flex items-center"
            : "hover:text-primary transition-all duration-200"
        }
      >
        <span className="max-[500px]:hidden">Register</span>
      </NavLink>
    </>
  );

  return (
    <header
      className={`sticky top-0 left-0 w-full border-b border-secondary bg-background z-50`}
    >
      <div
        className={`max-w-[1440px] mx-auto relative flex items-center justify-between transition-all duration-200 px-4 ${
          isSticky ? "py-4" : "py-6"
        }`}
      >
        {/* left side */}
        <div className="flex items-center justify-start gap-10">
          {/* Logo */}
          <div className="text-lg sm:text-2xl font-semibold flex items-center gap-1">
            <Link href="/" className="text-text flex flex-col">
              <img
                className="w-8 sm:w-10 object-cover"
                src={logo}
                alt="logo of timely app"
                aria-label="timely website logo"
              />
            </Link>
            <strong className="text-text font-bold">Timely</strong>
          </div>
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-text">
            {navlinks}
          </nav>
        </div>

        {/* right side */}
        <div className="flex items-center justify-end gap-4">
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
          {user && user?.email ? (
            <>
              <NavLink
                to="/dashboard/cart"
                onClick={() => setIsMenuOpen(false)}
                className=""
              >
                <img
                  className="w-6"
                  src={notificaionIcon}
                  alt="notification icon"
                />
              </NavLink>

              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hover:text-primary transition-all duration-200 flex items-center"
              >
                {
                  user?.photoURL ? <img className="w-8 h-8 object-cover rounded-full border" src={user?.photoURL} alt={`image of ${user?.displayName || "user"}`} /> : <FaUserCircle className="text-2xl cursor-pointer text-text" />
                }
                
              </button>
            </>
          ) : (
            <NavLink
              to="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              //   className="bg-accent text-sm text-text px-4 py-1 rounded-full font-medium"
            >
              <Button
                className="rounded-full text-text bg-primary-500"
                variant="default"
                size="sm"
              >
                Login
              </Button>
            </NavLink>
          )}

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <RiMenu3Fill
              className="text-xl cursor-pointer text-primary hover:text-accent"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background bg-opacity-90 flex flex-col items-center justify-center text-text transition-all duration-300 z-50">
          {/* Close Icon */}
          <FaTimes
            className="absolute top-5 right-5 text-3xl cursor-pointer hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Nav Links */}
          <nav className="flex flex-col items-center space-y-6 text-lg">
            {navlinks}
          </nav>
        </div>
      )}

      {/* User menu modal */}
      {isUserMenuOpen && (
        <ul className="absolute top-4/3 right-5 z-40 shadow-md rounded-lg flex flex-col gap-3 max-w-fit p-3 text-sm bg-background">
          <li className="text-gray-600 font-medium">
            {user?.displayName || user?.email || "User"}
          </li>
          <li>
            <Link
              state={{
                role: `${
                  isAdmin ? "Admin" : isDeliveryman ? "Deliveryman" : "User"
                }`,
              }}
              to={`/dashboard/${
                isAdmin
                  ? "adminDashboard"
                  : isDeliveryman
                  ? "myDeliveryList"
                  : "userProfile"
              }`}
              className="text-text font-semibold hover:text-primary"
            >
              Dashboard
            </Link>
          </li>
          {/* sign out button */}
          <li className="mt-1">
            <Button
              onClick={handleLogOut}
              className="rounded-md w-full text-xs text-text bg-accent"
              variant="default"
              size="sm"
            >
              Sign Out
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
