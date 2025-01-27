import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useSocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSocialLogin = async (path = "/") => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      let userInfo;

      const result = await googleSignIn();

      if (result.user?.email) {
        userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };

        // Save user info to database
        const response = await axiosPublic.post("/users", userInfo);
        if (response.data?.acknowledged) {
          toast.success("User created successfully.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            transition: Bounce,
          });
          navigate(path);
        } else if (response.data?.loggedin) {
          toast.success("Successfully logged in.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
            transition: Bounce,
          });
          navigate(path);
        }
      }
    } catch (err) {
      console.error("Error during social login:", err);
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSocialLogin, loading, error };
};

export default useSocialLogin;
