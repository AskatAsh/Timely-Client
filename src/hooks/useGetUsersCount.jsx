import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetUsersCount = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: usersCount } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersCount`);
      return res.data.usersCount;
    },
  });

  return [usersCount, refetch];
};

export default useGetUsersCount;