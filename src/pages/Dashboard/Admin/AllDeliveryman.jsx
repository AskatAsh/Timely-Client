import useGetAllDeliveryman from './../../../hooks/useGetAllDeliveryman';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const AllDeliveryman = () => {
  const [allDeliveryman] = useGetAllDeliveryman();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Deliveryman</h1>
      <p className="mb-4">Total Deliveryman: {allDeliveryman.length}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>n.</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone/Email</TableHead>
              <TableHead>Parcels Delivered</TableHead>
              <TableHead>Average Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allDeliveryman.map((user, idx) => (
              <TableRow key={user._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.phone || user?.email}</TableCell>
                <TableCell>{user?.totalParcels || "N/A"}</TableCell>
                <TableCell>{user?.totalSpent || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllDeliveryman;
