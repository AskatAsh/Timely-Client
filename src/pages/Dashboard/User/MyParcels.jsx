import { Button } from "@/components/ui/button";
import useGetMyParcels from "./../../../hooks/useGetMyParcels";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useAuth from "./../../../hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const MyParcels = () => {
  const { user } = useAuth();
  const [myParcels, refetch] = useGetMyParcels();
  const [isOpen, setIsOpen] = useState(false);
  const [parcel, setParcel] = useState("");
  const [myBookedParcels, setMyBookedParcels] = useState([]);
  const axiosSecure = useAxiosSecure();

  const resetStatus = async () => {
    await refetch();
    setMyBookedParcels(myParcels);
  };

  const filterByStatus = async (e) => {
    try {
      const res = await axiosSecure.get(
        `/parcelsByStatus?status=${e.target.value}&email=${user?.email}`
      );
      if (res.status === 200) {
        setMyBookedParcels(res.data);
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    if (myParcels) {
      setMyBookedParcels(myParcels);
    }
  }, [myParcels]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setParcel("");
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.username.value;
    const userImage = form.userImage.value;
    const deliverymanId = form.deliverymanId.value;
    const rating = form.rating.value;
    const review = form.review.value;
    const reviewInfo = {
      userName,
      userImage,
      deliverymanId,
      rating,
      review,
    };
    const res = await axiosSecure.post("/addReview", reviewInfo);
    if (res.data.insertedId) {
      enqueueSnackbar("Booked Delivery Successfully!", { variant: "success" });
      setIsOpen(false);
      setParcel("");
    }
  };

  return (
    <section className="p-4">
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      />
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
      <p className="mb-4">My total parcels: {myBookedParcels.length}</p>
      <div className="flex items-center gap-4 bg-primary-100 px-4 py-2 rounded-lg my-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h3 className="text-xl font-bold">Filter by Status:</h3>
          <div className="flex items-center gap-2">
            <select
              defaultValue=""
              onChange={filterByStatus}
              className="py-2 rounded-md font-medium"
            >
              <option value="">All parcels</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="on the way">On the way</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
        <Button onClick={resetStatus} className="bg-primary-400 text-text">
          Reset
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Approx. Delivery Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>DeliveryMan ID</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myBookedParcels.map((parcel, idx) => (
              <TableRow key={parcel._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{parcel?.bookingDate}</TableCell>
                <TableCell>{parcel?.deliverymanId || "N/A"}</TableCell>
                <TableCell>
                  {parcel?.status}
                  <br />
                  {/* add review button */}
                  {parcel?.status === "delivered" ? (
                    <Button
                      onClick={() => {
                        setIsOpen(true);
                        setParcel(parcel);
                      }}
                      size="xs"
                      className="bg-green-600 "
                    >
                      Add Review
                    </Button>
                  ) : (
                    ""
                  )}
                  {/* pay button */}
                  {parcel?.status === "pending" ? (
                    <Link
                      className="bg-accent rounded-sm text-xs font-medium text-white px-2 py-1"
                      to="/dashboard/payment"
                      state={{
                        amount: parcel?.price,
                        parcelId: parcel._id,
                        phone: parcel.phone,
                      }}
                    >
                      Pay Now
                    </Link>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button
                    size="xs"
                    className="bg-primary text-xs"
                    disabled={parcel?.status !== "pending"}
                  >
                    <Link
                      to={`/dashboard/updateParcel/${parcel._id}`}
                      state={{ parcel }}
                    >
                      Update
                    </Link>
                  </Button>
                  <Button
                    size="xs"
                    className="bg-red-600"
                    disabled={parcel?.status !== "pending"}
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
          <form
            onSubmit={handleAddReview}
            className="max-w-lg w-full p-5 rounded-xl shadow-lg m-4 bg-background border border-secondary-800 space-y-3"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaStar className="text-yellow-500" />{" "}
              <h3 className="text-lg font-bold">Give a Review</h3>
            </div>
            {/* username */}
            <div className="space-y-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                type="text"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>

            {/* photo url */}
            <div className="space-y-2">
              <Label htmlFor="userImage">User PhotoURL</Label>
              <Input
                id="userImage"
                type="url"
                defaultValue={user?.photoURL}
                readOnly
              />
            </div>

            {/* delveryman's Id */}
            <div className="space-y-2">
              <Label htmlFor="deliverymanId">Deliveryman Id</Label>
              <Input
                id="deliverymanId"
                type="text"
                defaultValue={parcel?.deliverymanId}
                readOnly
              />
            </div>

            {/* Review */}
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (out of 5)</Label>
              <Input
                id="rating"
                type="number"
                name="rating"
                min="1"
                max="5"
                step={0.1}
              />
            </div>

            {/* Review */}
            <div className="space-y-2">
              <Label htmlFor="review">Review comment</Label>
              <Textarea id="review" type="number" name="review" />
            </div>

            <div className="flex items-center justify-center gap-4 mt-3">
              <Button type="submit" className="bg-green-600/60 text-text">
                Add Review
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
    </section>
  );
};

export default MyParcels;
