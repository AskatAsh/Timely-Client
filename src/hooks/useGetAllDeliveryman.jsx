import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetAllDeliveryman = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: allDeliveryman = [] } = useQuery({
    queryKey: ["allDeliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allDeliveryman`);
      return res.data;
    },
  });

  return [allDeliveryman, refetch];
};

export default useGetAllDeliveryman;
