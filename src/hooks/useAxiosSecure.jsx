import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
})

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    // axios request interceptor
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = token;
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    // axios response interceptor
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logOut();
            navigate('/auth/login');
        }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;