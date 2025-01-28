import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import useAuth from "./../../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const imageApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;

const UserProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // State for storing the uploaded image file
  const [uploadedFile, setUploadedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const updateProfile = async (data) => {
    let photoURL = user?.photoURL;

    // Upload the image only if a new file is selected
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      try {
        const res = await axiosPublic.post(imageHostingApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          photoURL = res.data.data.display_url;
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        return;
      }
    }

    // Update user profile
    updateUserProfile(data.userName, photoURL).then(() => {
      const userInfo = {
        name: data.userName,
        phone: data.phone,
        userImage: photoURL,
      };

      axiosSecure
        .put(`/updateUser?email=${user?.email}`, userInfo)
        .then((res) => {
          if (res.data?.acknowledged) {
            reset();
            setUploadedFile(null); // Reset the file state
            enqueueSnackbar("Updated User Successfully!", {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: "error" });
        });
    });
  };

  return (
    <section className="bg-background overflow-hidden shadow rounded-lg border">
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      />
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="flex items-center gap-2 sm:gap-4 p-4 sm:p-6 relative">
          <div className="border rounded-full overflow-hidden">
            <img
              className="w-16 sm:w-20 h-16 sm:h-20 object-cover bg-background"
              src={user?.photoURL}
              alt="user image"
            />
            <Button size="xs" className="absolute top-24 left-16 sm:left-20">
              <label htmlFor="userImage">
                <FaEdit />
              </label>
              <Input
                id="userImage"
                type="file"
                className="hidden"
                onChange={handleFileChange} // Handle file change here
              />
            </Button>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-text">
              {user?.displayName || user?.email}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-text-500">
              This is some information about the user.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-text-500">Full name</dt>
              <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
                <Input
                  type="text"
                  defaultValue={user?.displayName}
                  name="userName"
                  {...register("userName")}
                  className="border-primary-300"
                  placeholder="Enter your full name"
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-text-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
                {user?.email || "User Email"}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-text-500">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
                <Input
                  type="phone"
                  name="phone"
                  {...register("phone")}
                  className="border-primary-300"
                  placeholder="Enter your phone number"
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-text-500">
                User verification
              </dt>
              <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
                {user?.emailVerified ? "Verified" : "Not Verified"}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-text-500">
                Last Login At
              </dt>
              <dd className="mt-1 text-sm text-text sm:mt-0 sm:col-span-2">
                {user?.metadata?.lastSignInTime || "N/A"}
              </dd>
            </div>
          </dl>
        </div>
        <Button type="submit" className="m-6 bg-primary-800">
          Save Update
        </Button>
      </form>
    </section>
  );
};

export default UserProfile;
