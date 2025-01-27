import { Button } from "@/components/ui/button";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import useGetMyDeliveryList from "./../../../hooks/useGetMyDeliveryList";
import { CiWarning } from "react-icons/ci";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { useCallback, useState, useEffect } from "react";

const MyDeliveryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const axiosSecure = useAxiosSecure();
  const [myDeliveryList, refetch] = useGetMyDeliveryList();
  const [deliveryList, setDeliveryList] = useState([]);

  useEffect(() => {
    if (myDeliveryList.length) {
      setDeliveryList(myDeliveryList);
    }
  }, [myDeliveryList]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setAction("");
  }, []);

  const handleConfirm = async () => {
    // console.log(action);
    // deliver or cancel delivery

    const res = await axiosSecure.put(`/deliveryAction/${action.id}`, {
      action: action.type,
    });
    if (res.data.acknowledged) {
      enqueueSnackbar("Action completed successfully", { variant: "success" });
      refetch();
      setIsOpen(false);
    }
    setAction("");
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
      <p className="mb-4">Total Deliveries: {deliveryList.length}</p>
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
            {deliveryList.map((delivery, idx) => (
              <TableRow key={delivery._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{delivery?.userName}</TableCell>
                <TableCell>{delivery?.receiverName}</TableCell>
                <TableCell>
                  {delivery?.userPhone || delivery?.userEmail}
                </TableCell>
                <TableCell>{delivery?.deliveryDate || "N/A"}</TableCell>
                <TableCell>{delivery?.approxDeliveryDate || "N/A"}</TableCell>
                <TableCell>{delivery?.phone || "N/A"}</TableCell>
                <TableCell>{delivery?.deliveryAddress || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => console.log("See Location", delivery._id)}
                    size="xs"
                    className="bg-accent-400 text-text"
                  >
                    See Location
                  </Button>
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setAction({ type: "delivered", id: delivery._id });
                    }}
                    size="xs"
                    className="bg-primary-400 text-text"
                    disabled={delivery.status==="delivered"}
                  >
                    Deliver
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setAction({ type: "canceled", id: delivery._id });
                    }}
                    size="xs"
                    className="bg-red-400 text-text"
                    disabled={delivery.status==="canceled" || delivery.status==="delivered"}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal to assign deliveryman */}
      {isOpen && (
        <div className="w-full items-center justify-center bg-[#00000050] backdrop-blur-sm absolute top-0 left-0 min-h-screen flex">
          <div className="max-w-lg w-full p-5 rounded-xl shadow-lg m-4 bg-background border border-secondary-800">
            <div className="flex flex-col items-center justify-center gap-4 mt-3 text-center">
              <p className="py-2">
                <CiWarning size={48} className={`${action.type === "canceled" ? "text-red-400" : "text-primary-700"}`} />
              </p>
              <h3 className="text-text text-2xl font-bold">Are you sure !?</h3>
              <p className="mb-3">
                You won&apos;t be able to revert the changes!
              </p>
              <Button
                onClick={handleConfirm}
                type="submit"
                className={`${action.type === "canceled" ? "bg-red-400" : "bg-primary-500"} text-text`}
              >
                Yes, Confirm {action.type}!
              </Button>
            </div>
          </div>

          <Button
            onClick={closeModal}
            className="bg-red-500 text-white absolute top-5 right-5"
          >
            X
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyDeliveryList;
