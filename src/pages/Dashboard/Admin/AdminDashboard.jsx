import useGetStats from "./../../../hooks/useGetStats";

const AdminDashboard = () => {
  const [stats] = useGetStats();

  return (
    <div>
      <section className="bg-primary-100 p-6 rounded-3xl">
        <h2 className="text-3xl font-extrabold text-text mb-6 my-2 text-center">
          Statistics
        </h2>
        <div className="max-w-7xl w-full mx-auto flex justify-center gap-8 flex-wrap mt-10">
          {/* stat 1 */}
          <div className="bg-primary-100 p-6 rounded-2xl text-center flex-1">
            <h3 className="font-bold text-primary-600">Percel Booked</h3>
            <p className="text-6xl font-extrabold text-primary pt-3">
              {stats.totalParcelsBooked}
            </p>
          </div>
          {/* stat 2 */}
          <div className="bg-primary-100 p-6 rounded-2xl text-center flex-1">
            <h3 className="font-bold text-primary-600">Percels Delivered</h3>
            <p className="text-6xl font-extrabold text-primary pt-3">
              {stats.totalDelivered}
            </p>
          </div>
          {/* stat 3 */}
          <div className="bg-primary-100 p-6 rounded-2xl text-center flex-1">
            <h3 className="font-bold text-primary-600">Total Users</h3>
            <p className="text-6xl font-extrabold text-primary pt-3">
              {stats.totalUsers}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
