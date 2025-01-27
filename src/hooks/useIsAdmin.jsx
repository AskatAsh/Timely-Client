import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useIsAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log(user, loading);

  const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: user !== null && !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/admin?email=${user?.email}`);
      // console.log(response.data);
      return response.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useIsAdmin;