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
import { useCallback, useState } from "react";
import useAuth from "./../../../hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const MyParcels = () => {
  const { user } = useAuth();
  const [myParcels] = useGetMyParcels();
  const [isOpen, setIsOpen] = useState(false);
  const [parcel, setParcel] = useState("");
  const axiosSecure = useAxiosSecure();

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
    // console.log(reviewInfo);
    const res = await axiosSecure.post("/addReview", reviewInfo);
    console.log(res);
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
      <p className="mb-4">My total parcels: {myParcels.length}</p>
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
            {myParcels.map((parcel, idx) => (
              <TableRow key={parcel._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{parcel?.bookingDate}</TableCell>
                <TableCell>{parcel?.deliverymanId || "N/A"}</TableCell>
                <TableCell>
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
                    `${parcel?.status}`
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
