import { Button } from "@/components/ui/button";
import useGetAllUsers from "./../../../hooks/useGetAllUsers";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import useGetUsersCount from "./../../../hooks/useGetUsersCount";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersCount] = useGetUsersCount();
  const [allUsers, refetch] = useGetAllUsers(currentPage, itemsPerPage);

  useEffect(() => {
    if (allUsers && allUsers.length !== users.length) {
      setUsers(allUsers);
    }
  }, [allUsers, users.length]);

  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage, refetch]);

  // Calculate numberOfPages directly based on usersCount
  const numberOfPages = Math.ceil(usersCount / itemsPerPage);

  // Generate pages array
  const pages = Array.from({ length: numberOfPages }, (_, i) => i);

  // change user role
  const handleChangeRole = async (role, id) => {
    const res = await axiosSecure.patch(`/changeRole/${id}`, { role });
    if (res.data?.acknowledged) {
      enqueueSnackbar(`User role changed to ${role} Successfully!`, {
        variant: "success",
      });
      refetch();
    }
  };

  return (
    <div className="p-4">
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      />
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <p className="mb-4">Total Users: {usersCount}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone/Email</TableHead>
              <TableHead>Total Parcels</TableHead>
              <TableHead>Total Spent (Tk)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, idx) => (
              <TableRow key={user._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.phone || user?.email}</TableCell>
                <TableCell>{user?.totalParcels || "N/A"}</TableCell>
                <TableCell>{user?.totalSpent || "N/A"}</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleChangeRole("deliveryman", user._id)}
                    size="xs"
                    className="bg-primary-400 text-text"
                  >
                    Make Deliveryman
                  </Button>
                  <Button
                    onClick={() => handleChangeRole("admin", user._id)}
                    size="xs"
                    className="bg-red-400 text-text"
                  >
                    Make Admin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center my-6">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 mx-1 rounded ${
              page === currentPage
                ? "bg-primary-800 text-white"
                : "bg-primary-200 text-black"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;