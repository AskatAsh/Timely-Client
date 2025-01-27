import { Button } from "@/components/ui/button";
import useGetAllParcels from "./../../../hooks/useGetAllParcels";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { useState, useCallback } from "react";
import useGetAllDeliveryman from "./../../../hooks/useGetAllDeliveryman";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const AllParcels = () => {
  const [allParcels] = useGetAllParcels();
  const [isOpen, setIsOpen] = useState(false);
  const [parcelId, setParcelId] = useState("");
  const [allDeliveryman] = useGetAllDeliveryman();
  const axiosSecure = useAxiosSecure();

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setParcelId(""); // Reset the parcelId when closing the modal
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    const deliverymanId = e.target.deliveryman.value;
    try {
      const res = await axiosSecure.patch(`/assignDeliveryman/${parcelId}`, {
        deliverymanId,
      });
      console.log(res);
      if (res.data.acknowledged) {
        enqueueSnackbar("Assigned Deliveryman Successfully!", {
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Error assigning deliveryman:", err);
    } finally {
      closeModal();
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
      <h1 className="text-2xl font-bold mb-4">All Parcels</h1>
      <p className="mb-4">Total parcels: {allParcels.length}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone/Email</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Cost (tk)</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allParcels.map((parcel, idx) => (
              <TableRow key={parcel._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{parcel?.userName}</TableCell>
                <TableCell>{parcel?.userPhone || parcel?.userEmail}</TableCell>
                <TableCell>{parcel?.bookingDate}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{parcel?.price || "N/A"}</TableCell>
                <TableCell>{parcel?.status}</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setParcelId(parcel._id);
                    }}
                    size="xs"
                    className="bg-primary text-xs"
                  >
                    Manage
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
          <form
            onSubmit={handleAssign}
            className="max-w-lg w-full p-5 rounded-xl shadow-lg m-4 bg-background border border-secondary-800"
          >
            <label htmlFor="assign">Assign a Deliveryman</label>
            <select
              name="deliveryman"
              id="assign"
              className="w-full border-2 rounded-md py-2 mt-2"
            >
              <option value="" disabled>
                Select a deliveryman
              </option>
              {allDeliveryman.map((deliveryman) => (
                <option key={deliveryman._id} value={deliveryman._id}>
                  {deliveryman.name}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-center gap-4 mt-3">
              <Button type="submit" className="bg-primary-600 text-text">
                Assign
              </Button>
            </div>
          </form>
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

export default AllParcels;
