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

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, refetch] = useGetAllUsers();
  console.log(allUsers);

  const handleChangeRole = async (role, id) => {
    const res = await axiosSecure.patch(`/changeRole/${id}`, { role });
    console.log(res);
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
      <p className="mb-4">Total Users: {allUsers.length}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>n.</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone/Email</TableHead>
              <TableHead>Total Parcels</TableHead>
              <TableHead>Total Spent (Tk)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers.map((user, idx) => (
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
    </div>
  );
};

export default AllUsers;
