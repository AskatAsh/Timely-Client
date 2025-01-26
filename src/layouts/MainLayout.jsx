import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { ToastContainer } from "react-toastify";


const MainLayout = () => {
  return (
    <div className="bg-background font-display">
      {/* header section with navigation */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* footer section */}
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default MainLayout;