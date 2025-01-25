import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";


const MainLayout = () => {
  return (
    <div className="bg-gray-100 font-display">
      {/* header section with navigation */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;