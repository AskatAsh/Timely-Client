import CountUp from "react-countup";
import useGetStats from './../../../hooks/useGetStats';

const Stats = () => {
    const [stats] = useGetStats();
    return (
        <section className="bg-primary-100 py-20 my-20">
            <p className="uppercase text-primary text-sm font-medium text-center">Our Stats</p>
            <h2 className="text-3xl font-extrabold text-text mb-6 my-2 text-center">Check Timely Stats</h2>
            <div className="max-w-7xl w-full px-6 mx-auto flex justify-center gap-8 flex-wrap mt-10">
                {/* stat 1 */}
                <div className="bg-primary-100 p-6 rounded-2xl text-center flex-1">
                    <h3 className="font-bold text-primary-600">Percel Booked</h3>
                    <p className="text-6xl font-extrabold text-primary pt-3"><CountUp end={stats.totalParcelsBooked} duration={10} />+</p>
                </div>
                {/* stat 2 */}
                <div className="bg-primary-100 p-6 rounded-2xl text-center flex-1">
                    <h3 className="font-bold text-primary-600">Percels Delivered</h3>
                    <p className="text-6xl font-extrabold text-primary pt-3"><CountUp end={stats.totalDelivered} duration={10} />+</p>
                </div>
                {/* stat 3 */}
                <div className="bg-primary-100 p-6 rounded-2xl text-center flex-1">
                    <h3 className="font-bold text-primary-600">Total Users</h3>
                    <p className="text-6xl font-extrabold text-primary pt-3"><CountUp end={stats.totalUsers} duration={10} />+</p>
                </div>
            </div>
        </section>
    );
};

export default Stats;