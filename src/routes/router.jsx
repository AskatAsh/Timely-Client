import { createBrowserRouter } from "react-router-dom";
import AuthLayout from './../layouts/AuthLayout';
import Dashboard from './../layouts/Dashboard';
import MainLayout from './../layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <div>home page</div>
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  }
])
export default router;