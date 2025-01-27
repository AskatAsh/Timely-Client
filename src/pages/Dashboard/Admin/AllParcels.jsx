import { Button } from "@/components/ui/button";
import useGetAllParcels from './../../../hooks/useGetAllParcels';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const AllParcels = () => {
  const [allParcels] = useGetAllParcels();

  return (
    <div className="p-4">
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
                <TableHead>Cost</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allParcels.map((parcel, idx) => (
              <TableRow key={parcel._id}>
                  <TableCell>{idx+1}</TableCell>
                  <TableCell>{parcel?.userName}</TableCell>
                  <TableCell>{parcel?.userPhone || parcel?.userEmail}</TableCell>
                  <TableCell>{parcel?.bookingDate}</TableCell>
                  <TableCell>{parcel?.deliveryDate}</TableCell>
                  <TableCell>{parcel?.cost || "N/A"}</TableCell>
                  <TableCell>{parcel?.status}</TableCell>
                  <TableCell className="flex flex-col gap-2">
                    <Button size="xs" className="bg-primary text-xs">Manage</Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllParcels;
