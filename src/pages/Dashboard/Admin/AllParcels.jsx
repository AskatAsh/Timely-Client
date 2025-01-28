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
import { useState, useCallback, useEffect } from "react";
import useGetAllDeliveryman from "./../../../hooks/useGetAllDeliveryman";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

const AllParcels = () => {
  const [allParcels, refetch] = useGetAllParcels();
  const [isOpen, setIsOpen] = useState(false);
  const [parcelId, setParcelId] = useState("");
  const [allDeliveryman] = useGetAllDeliveryman();
  const axiosSecure = useAxiosSecure();

  const [parcelsData, setParcelsData] = useState(allParcels);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (allParcels) {
      setParcelsData(allParcels);
    }
  }, [allParcels]);

  const filterByDate = async (data) => {
    // console.log(data.fromDate, data.toDate);
    try {
      const res = await axiosSecure.get(
        `/filteredParcels?fromDate=${data.fromDate}&toDate=${data.toDate}`
      );
      if (res.status === 200) {
        setParcelsData(res.data);
        reset();
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const resetForm = async () => {
    reset();
    await refetch();
    setParcelsData(allParcels);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setParcelId("");
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    const deliverymanId = e.target.deliveryman.value;
    const approxDeliveryDate = format(
      e.target.approxDeliveryDate.value,
      "yyyy/MM/dd"
    );
    const assignedInfo = { deliverymanId, approxDeliveryDate };
    // console.log(assignedInfo);
    try {
      const res = await axiosSecure.patch(
        `/assignDeliveryman/${parcelId}`,
        assignedInfo
      );
      if (res.data.acknowledged) {
        enqueueSnackbar("Assigned Deliveryman Successfully!", {
          variant: "success",
        });
        refetch();
      }
    } catch (err) {
      console.error("Error assigning deliveryman:", err);
    } finally {
      closeModal();
    }
  };

  return parcelsData.length ? (
    <div className="p-4">
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      />
      <h1 className="text-2xl font-bold mb-4">All Parcels</h1>
      <p className="mb-4">Total parcels: {parcelsData.length}</p>
      <div className="flex items-center gap-4 bg-primary-100 px-4 py-2 rounded-lg my-4">
        <form
          onSubmit={handleSubmit(filterByDate)}
          className="flex items-center gap-4 "
        >
          <h3 className="text-xl font-bold">Filter by Date:</h3>
          <div className="flex items-center gap-2">
            <Label htmlFor="fromDate">From:</Label>
            <Input
              id="fromDate"
              type="date"
              name="fromDate"
              {...register("fromDate")}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="toDate">To:</Label>
            <Input
              id="toDate"
              type="date"
              name="toDate"
              {...register("toDate")}
            />
          </div>
          <Button type="submit" className="bg-primary-600 text-text">
            Apply Filter
          </Button>
        </form>
        <Button onClick={resetForm} variant="outline">
          Reset
        </Button>
      </div>
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
            {parcelsData.map((parcel, idx) => (
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
            <div>
              <Label htmlFor="assign">Assign a Deliveryman</Label>
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
            </div>
            <div className="mt-3">
              <Label htmlFor="deliveryDate">Approximate Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                name="approxDeliveryDate"
                className="mt-2"
              />
            </div>
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
  ) : (
    <div>No Parcels to show</div>
  );
};

export default AllParcels;
