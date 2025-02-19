import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./../layouts/AuthLayout";
import Dashboard from "./../layouts/Dashboard";
import MainLayout from "./../layouts/MainLayout";
import Home from "./../pages/Home/Home";
import Login from "./../pages/Auth/Login";
import SignUp from "./../pages/Auth/SignUp";
import BookParcel from "./../pages/Dashboard/User/BookParcel";
import UserProfile from "./../pages/Dashboard/User/UserProfile";
import MyParcels from "./../pages/Dashboard/User/MyParcels";
import AdminDashboard from "./../pages/Dashboard/Admin/AdminDashboard";
import AllParcels from "./../pages/Dashboard/Admin/AllParcels";
import AllUsers from "./../pages/Dashboard/Admin/AllUsers";
import AllDeliveryman from "./../pages/Dashboard/Admin/AllDeliveryman";
import MyDeliveryList from "./../pages/Dashboard/Deliveryman/MyDeliveryList";
import UpdateParcel from "./../pages/Dashboard/User/UpdateParcel";
import MyReviews from "./../pages/Dashboard/Deliveryman/MyReviews";
import PrivateRoute from "./PrivateRoute";
import Payment from './../pages/Dashboard/User/Payment/Payment';
import PaymentSuccess from './../pages/Dashboard/User/Payment/PaymentSuccess';
import ContactUs from './../pages/Contact/ContactUs';
import AboutUs from './../pages/About/AboutUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/contactus',
        element: <ContactUs />
      },
      {
        path: '/aboutus',
        element: <AboutUs />
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // user routes
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "bookParcel",
        element: <BookParcel />,
      },
      {
        path: "updateParcel/:id",
        element: <UpdateParcel />,
      },
      {
        path: "myParcels",
        element: <MyParcels />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "paymentSuccess",
        element: <PaymentSuccess />,
      },
      // admin routes
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "allParcels",
        element: <AllParcels />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "allDeliveryman",
        element: <AllDeliveryman />,
      },
      // deliverman routes
      {
        path: "myDeliveryList",
        element: <MyDeliveryList />,
      },
      {
        path: "myReviews",
        element: <MyReviews />,
      },
    ],
  },
]);
export default router;
