import { Navigate, useLocation } from "react-router";
import { PropTypes } from 'prop-types';
import useAuth from './../hooks/useAuth';
import loadingImage from '../assets/loading-delivery.gif';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return (
            <div className="max-w-4xl w-11/12 mx-auto flex items-center justify-center py-20">
                <img className="w-10 object-cover" src={loadingImage} alt="Loading truck gif image" />
            </div>
        )
    }

    if (user && user?.email) {
        return children;
    }
    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}

export default PrivateRoute;