import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = (currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: allUsers = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allUsers?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
      return res.data;
    },
  });

  return [allUsers, refetch];
};

export default useGetAllUsers;
