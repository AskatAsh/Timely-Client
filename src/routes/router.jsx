import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./../layouts/AuthLayout";
import Dashboard from "./../layouts/Dashboard";
import MainLayout from "./../layouts/MainLayout";
import Home from "./../pages/Home/Home";
import Login from "./../pages/Auth/Login";
import SignUp from "./../pages/Auth/SignUp";
import UserProfile from "@/pages/Dashboard/User/UserProfile";

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
      }
    ]
  },
]);
export default router;
