import fastDelivery from "../../assets/images/fast-delivery.svg";
import securePackage from "../../assets/images/safe-delivery.svg";
import realtimeTracking from "../../assets/images/drone-delivery.svg";
import { Helmet } from "react-helmet-async";

const aboutUsData = {
  title: "About Our Parcel Booking Service",
  description:
    "We simplify parcel booking with a seamless, secure, and efficient process. Our service ensures timely and hassle-free deliveries with real-time tracking.",
  features: [
    {
      title: "Fast & Reliable",
      description:
        "Experience quick and dependable parcel deliveries tailored to your needs.",
      image: fastDelivery,
    },
    {
      title: "Secure Packaging",
      description:
        "We ensure your parcels are securely packed and handled with utmost care.",
      image: securePackage,
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your parcel in real-time with our advanced tracking system.",
      image: realtimeTracking,
    },
  ],
};

const AboutUs = () => {
  return (
    <section className="bg-secondary-200 py-16 px-6 md:px-12 lg:px-20">
      <Helmet>
        <title>Timely | About Us</title>
      </Helmet>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text-900">
          {aboutUsData.title}
        </h2>
        <p className="mt-4 text-text-700 text-lg md:text-xl">
          {aboutUsData.description}
        </p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {aboutUsData.features.map((feature, index) => (
          <div
            key={index}
            className="bg-background p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-accent-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-text-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
