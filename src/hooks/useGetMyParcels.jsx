import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import useAxiosSecure from "./useAxiosSecure";


const useGetMyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { refetch, data: myParcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myParcels?email=${user?.email}`);
      return res.data;
    },
  });

  return [myParcels, refetch];
};

export default useGetMyParcels;