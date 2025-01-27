// import PropTypes from 'prop-types';

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
    return (
        <main className="font-display">
            <Outlet />
            <ToastContainer />
        </main>
    );
};

// AuthLayout.propTypes = {
//     children: PropTypes.object
// }

export default AuthLayout;