import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./../layouts/AuthLayout";
import Dashboard from "./../layouts/Dashboard";
import MainLayout from "./../layouts/MainLayout";
import Home from "./../pages/Home/Home";
import Login from "./../pages/Auth/Login";
import SignUp from "./../pages/Auth/SignUp";
import BookParcel from './../pages/Dashboard/User/BookParcel';
import UserProfile from './../pages/Dashboard/User/UserProfile';
import MyParcels from './../pages/Dashboard/User/MyParcels';
import AdminDashboard from './../pages/Dashboard/Admin/AdminDashboard';
import AllParcels from "./../pages/Dashboard/Admin/AllParcels";
import AllUsers from './../pages/Dashboard/Admin/AllUsers';
import AllDeliveryman from './../pages/Dashboard/Admin/AllDeliveryman';
import MyDeliveryList from "./../pages/Dashboard/Deliveryman/MyDeliveryList";
import UpdateParcel from './../pages/Dashboard/User/UpdateParcel';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    element: <Dashboard />,
    children: [
      // user routes
      {
        path: 'userProfile',
        element: <UserProfile />
      },
      {
        path: 'bookParcel',
        element: <BookParcel />
      },
      {
        path: 'updateParcel/:id',
        element: <UpdateParcel />
      },
      {
        path: 'myParcels',
        element: <MyParcels />
      },
      // admin routes
      {
        path: 'adminDashboard',
        element: <AdminDashboard />
      },
      {
        path: 'allParcels',
        element: <AllParcels />
      },
      {
        path: 'allUsers',
        element: <AllUsers />
      },
      {
        path: 'allDeliveryman',
        element: <AllDeliveryman />
      },
      // deliverman routes
      {
        path: 'myDeliveryList',
        element: <MyDeliveryList />
      },
    ]
  },
]);
export default router;
