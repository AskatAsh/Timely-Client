import fastDelivery from "../../../assets/images/fast-delivery.svg";
import safeDelivery from "../../../assets/images/safe-delivery.svg";
import droneDelivery from "../../../assets/images/drone-delivery.svg";

const OurFeatures = () => {
  return (
    <section className="my-20 max-w-7xl w-full px-6 mx-auto">
        <p className="uppercase text-primary text-sm font-medium">Our new features</p>
        <h2 className="text-3xl font-extrabold text-text mb-6 mt-2">Fast, safe and secure delivery and more...</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* feature 1 */}
        <div className="border border-secondary-700 p-4 rounded-3xl">
          <img className="rounded-t-2xl w-full object-cover aspect-video border border-secondary-500" src={fastDelivery} alt="Super fast delivery icon" />
          <h3 className="text-xl font-bold text-text py-3">Super fast delivery</h3>
          <p className="text-text-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            nam?
          </p>
        </div>
        {/* feature 2 */}
        <div className="border border-secondary-700 p-4 rounded-3xl">
          <img className="rounded-t-2xl w-full object-cover aspect-video border border-secondary-500" src={safeDelivery} alt="Super safe delivery icon" />
          <h3 className="text-xl font-bold text-text py-3">Safety of parcel and delivery</h3>
          <p className="text-text-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            nam?
          </p>
        </div>
        {/* feature 3 */}
        <div className="border border-secondary-700 p-4 rounded-3xl">
          <img className="rounded-t-2xl w-full object-cover aspect-video border border-secondary-500" src={droneDelivery} alt="drone delivery icon" />
          <h3 className="text-xl font-bold text-text py-3">Delivery with drone technology</h3>
          <p className="text-text-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            nam?
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;
