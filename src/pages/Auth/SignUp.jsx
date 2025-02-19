import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import signupImage from "../../assets/images/Sign up.gif";
import useSocialLogin from "./../../hooks/useSocialLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import logo from "../../../src/assets/icons/timely-logo.png";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import useTheme from "./../../hooks/useTheme";

const SignUp = () => {
  const { handleSocialLogin, loading } = useSocialLogin();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // sign up using email password
  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        if (loggedUser) {
          updateUserProfile(data.name, data.photoURL)
            .then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
                role: data.role,
              };
              axiosPublic
                .post("/users", userInfo)
                .then((res) => {
                  if (res.data?.acknowledged && res.data?.insertedId) {
                    reset();
                    toast.success("User created successfully.", {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      theme: "light",
                      transition: Bounce,
                    });
                    navigate("/");
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
  };

  return (
    <section className="min-h-screen flex items-center justify-center my-10">
      <Helmet>
        <title>Timely | Sign Up</title>
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
      <div className="bg-transperant w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 mx-3 my-10">
        {/* Left or top side - Illustration */}
        <div className="flex items-center justify-center bg-transperant rounded-2xl overflow-hidden mb-5 sm:mb-0">
          <img
            src={signupImage}
            alt="Signup Illustration gif image"
            className="object-cover w-40 sm:w-full"
          />
        </div>

        {/* Right or bottom Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 border-2 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>

          <form onSubmit={handleSubmit(handleSignUp)}>
            {/* user name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                type="name"
                {...register("name", { required: true })}
                id="name"
                placeholder="Type name here"
                className="input input-bordered w-full"
              />
            </div>

            {/* user email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                {...register("email", { required: true })}
                id="email"
                placeholder="Type email here"
                className="input input-bordered w-full"
              />
            </div>

            {/* user photo url */}
            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium mb-2">
                Photo URL
              </label>
              <Input
                type="text"
                {...register("photoURL", { required: true })}
                id="photo"
                placeholder="Enter Photo URL"
                className="input input-bordered w-full"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>

            {/* user role */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                User Role
              </label>
              <select
                className="border rounded-lg py-2 bg-transparent w-full"
                {...register("role", { required: true })}
                defaultValue="user"
                name="role"
                id="role"
              >
                <option value="user">User</option>
                <option value="deliveryman">DeliveryMan</option>
              </select>
            </div>

            {/* user password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full mb-1"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600 text-sm">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 text-sm">
                  Password must be 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600 text-sm">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600 text-sm">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>

            <Button className="btn bg-primary text-text font-semibold hover:bg-primary w-full">
              Sign Up
            </Button>
          </form>

          <div className="text-center mt-4">
            <p>
              Already registered?{" "}
              <Link
                to="/auth/login"
                className="text-primary font-semibold hover:underline"
              >
                Go to Login
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-dark1 mb-4 font-semibold">
              Or sign up with
            </p>
            <Button
              onClick={() => handleSocialLogin("/")}
              disabled={loading}
              className="flex items-center justify-center mx-auto bg-primary"
            >
              <FaGoogle /> Google Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
