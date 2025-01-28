import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import useGetTopDeliveryman from "./../../../hooks/useGetTopDeliveryman";

const TopDeliveryMen = () => {
  const [topDeliveryman] = useGetTopDeliveryman();

  return (
    <section className="my-20 max-w-7xl w-full px-6 mx-auto">
      <p className="uppercase text-primary text-sm font-medium">
        Our Top Delivery
      </p>
      <h2 className="text-3xl font-extrabold text-text mb-6 mt-2">
        Meet our top and trusted delivery workers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* top deliveryman */}
        {topDeliveryman.map((deliveryman) => (
          <div
            key={deliveryman.deliverymanId}
            className="border border-secondary-700 rounded-3xl"
          >
            <img
              className="rounded-t-2xl w-full object-cover aspect-[3/2.5] border border-secondary-500"
              src="https://i.ibb.co/s9vCQF1/portrait-interesting-young-man-winter-clothes-158595-914.jpg"
              alt="drone delivery icon"
            />
            <div className="text-center py-6 px-4">
              <div className="text-center pb-2 flex items-center justify-center gap-2">
                <Rating
                  className="text-yellow-500 text-xl"
                  placeholderRating={deliveryman?.averageRating}
                  placeholderSymbol={<FaStar />}
                  start={0}
                  stop={5}
                  step={1}
                  readonly={true}
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar />}
                />
                <span className="font-bold">{deliveryman?.averageRating}/5</span>
              </div>
              <h3 className="text-xl font-bold text-text pb-4">
                {deliveryman?.name}
              </h3>
              <p className="text-text-600 font-medium">
                <span className="text-primary">{deliveryman?.totalDeliveries}+</span> percels delivered
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDeliveryMen;
