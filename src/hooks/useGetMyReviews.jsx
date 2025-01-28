import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import useAxiosSecure from "./useAxiosSecure";


const useGetMyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { refetch, data: myReviews = [] } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myReviews?email=${user?.email}`);
      return res.data;
    },
  });

  return [myReviews, refetch];
};

export default useGetMyReviews;