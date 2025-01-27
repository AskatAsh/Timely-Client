import { Button } from "@/components/ui/button";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import useGetMyDeliveryList from './../../../hooks/useGetMyDeliveryList';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const [myDeliveryList, refetch] = useGetMyDeliveryList();
  console.log(myDeliveryList);

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
      <h1 className="text-2xl font-bold mb-4">My Delivery List</h1>
      <p className="mb-4">Total Deliveries: {myDeliveryList.length}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Booked User&apos;s Name</TableHead>
              <TableHead>Receivers Name</TableHead>
              <TableHead>Phone/Email</TableHead>
              <TableHead>Req. Delivery Date</TableHead>
              <TableHead>Approx. Delivery Date</TableHead>
              <TableHead>Receivers Phone</TableHead>
              <TableHead>Receivers Address</TableHead>
              <TableHead>View Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myDeliveryList.map((delivery, idx) => (
              <TableRow key={delivery._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{delivery?.userName}</TableCell>
                <TableCell>{delivery?.receiverName}</TableCell>
                <TableCell>{delivery?.userPhone || delivery?.userEmail}</TableCell>
                <TableCell>{delivery?.deliveryDate || "N/A"}</TableCell>
                <TableCell>{delivery?.approxDeliveryDate || "N/A"}</TableCell>
                <TableCell>{delivery?.phone || "N/A"}</TableCell>
                <TableCell>{delivery?.deliveryAddress || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleChangeRole("deliveryman", delivery._id)}
                    size="xs"
                    className="bg-accent-400 text-text"
                  >
                    See Location
                  </Button>
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleChangeRole("deliveryman", delivery._id)}
                    size="xs"
                    className="bg-primary-400 text-text"
                  >
                    Deliver
                  </Button>
                  <Button
                    onClick={() => handleChangeRole("admin", delivery._id)}
                    size="xs"
                    className="bg-red-400 text-text"
                  >
                    Cancel
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

export default MyDeliveryList;