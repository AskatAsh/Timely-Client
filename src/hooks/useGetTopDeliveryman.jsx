import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetTopDeliveryman = () => {
  const axiosSecure = useAxiosPublic();


  const { refetch, data: topDeliveryman = [] } = useQuery({
    queryKey: ["topDeliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/topDeliveryman`);
      return res.data;
    },
  });

  return [topDeliveryman, refetch];
};

export default useGetTopDeliveryman;