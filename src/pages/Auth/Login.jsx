import loginImage from "../../assets/images/Login.gif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import useSocialLogin from "@/hooks/useSocialLogin";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import logo from "../../../src/assets/icons/timely-logo.png";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import useTheme from "./../../hooks/useTheme";

const Login = () => {
  const { handleSocialLogin, loading } = useSocialLogin();
  const axiosPublic = useAxiosPublic();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((result) => {
      if (result.user) {
        const userInfo = {
          name: result.user.name,
          email: result.user.email,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.loggedin) {
              toast.success("User Login Successful.", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "light",
                transition: Bounce,
              });
              form.reset();
              navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              theme: "light",
              transition: Bounce,
            });
          });
      }
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center my-10">
      <Helmet>
        <title>Timely | Login</title>
      </Helmet>
      <div className="absolute top-5 right-5 md:left-5 md:right-auto flex gap-3 items-center flex-row-reverse">
        {/* theme toggle button */}
        <div className="text-2xl cursor-pointer" onClick={() => toggleTheme()}>
          {theme === "dark" ? (
            <HiOutlineLightBulb className="text-yellow-400" />
          ) : (
            <MdOutlineDarkMode />
          )}
        </div>
        {/* Logo linked to homepage */}
        <Link to="/" className="text-text flex flex-col">
          <img
            className="w-8 sm:w-10 object-cover"
            src={logo}
            alt="logo of timely app"
            aria-label="timely website logo"
          />
        </Link>
      </div>
      <div className="bg-transperant w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 mx-3">
        {/* Left or top side - Illustration */}
        <div className="flex items-center justify-center bg-transperant rounded-2xl overflow-hidden mb-5 sm:mb-0">
          <img
            src={loginImage}
            alt="Login Illustration gif image"
            className="object-cover w-40 sm:w-full"
          />
        </div>

        {/* Right or bottom Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 border-2 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome Back!</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
            </div>

            <Button className="btn bg-accent-700 text-text font-semibold hover:bg-golden w-full">
              Sign In
            </Button>
          </form>

          <div className="text-center mt-4">
            <p>
              New here?{" "}
              <Link
                to="/auth/signup"
                className="text-accent font-semibold hover:underline"
              >
                Create a New Account
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-dark1 mb-4 font-semibold">
              Or sign in with
            </p>
            <div className="flex justify-center gap-6">
              <Button
                onClick={() => handleSocialLogin(from)}
                disabled={loading}
                className="flex items-center justify-center mx-auto bg-accent"
              >
                <FaGoogle /> Google Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
