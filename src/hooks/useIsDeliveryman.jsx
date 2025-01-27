import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useIsDeliveryman = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log(user, loading);

  const { data: isDeliveryman = false, isPending: isDeliverymanLoading } = useQuery({
    queryKey: [user?.email, "isDeliveryman"],
    enabled: user !== null && !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/deliveryman?email=${user?.email}`);
      // console.log(response.data);
      return response.data?.isDeliveryman;
    },
  });
  return [isDeliveryman, isDeliverymanLoading];
};

export default useIsDeliveryman;