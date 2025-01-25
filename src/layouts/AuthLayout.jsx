// import PropTypes from 'prop-types';

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
};

// AuthLayout.propTypes = {
//     children: PropTypes.object
// }

export default AuthLayout;