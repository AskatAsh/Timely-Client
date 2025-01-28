import useGetStats from "./../../../hooks/useGetStats";
import useGetAllParcels from "./../../../hooks/useGetAllParcels";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats] = useGetStats();
  const [allParcels] = useGetAllParcels();
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });
  useEffect(() => {
    // Process data to group bookings by date
    const bookingCounts = allParcels.reduce((acc, booking) => {
      const date = booking.bookingDate;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Extract dates and counts
    const dates = Object.keys(bookingCounts);
    const counts = Object.values(bookingCounts);

    // Set chart data
    setChartData({
      series: [
        {
          name: "Bookings",
          data: counts,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        xaxis: {
          categories: dates, // Dates as labels
          title: {
            text: "Booking Date",
          },
        },
        yaxis: {
          title: {
            text: "Number of Bookings",
          },
        },
        colors: ["#6d12ce"],
        title: {
          text: "Bookings by Date",
          align: "center",
        },
      },
    });
  }, [allParcels]);

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

      {/* bar chart showing bookings by date */}
      <div className="chart my-10">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
