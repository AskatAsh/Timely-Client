import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import useAxiosSecure from "./useAxiosSecure";


const useGetMyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: myDeliveryList = [] } = useQuery({
    queryKey: ["myDeliveryList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myDeliveryList?email=${user?.email}`);
      return res.data;
    },
  });

  return [myDeliveryList, refetch];
};

export default useGetMyDeliveryList;