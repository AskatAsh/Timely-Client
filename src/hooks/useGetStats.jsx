import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetStats = () => {
  const axiosSecure = useAxiosPublic();


  const { refetch, data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stats`);
      return res.data;
    },
  });

  return [stats, refetch];
};

export default useGetStats;