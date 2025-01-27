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

const MyParcels = () => {
  const [myParcels] = useGetMyParcels();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
      <p className="mb-4">My total parcels: {myParcels.length}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>n.</TableHead>
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
                    <Button size="xs" className="bg-green-600">Add Review</Button>
                  ): `${parcel?.status}`}
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button size="xs" className="bg-primary text-xs" disabled={parcel?.status !== "pending"}>
                    <Link to={`/dashboard/updateParcel/${parcel._id}`}>Update</Link>
                  </Button>
                  <Button size="xs" className="bg-red-600" disabled={parcel?.status !== "pending"}>
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

export default MyParcels;
