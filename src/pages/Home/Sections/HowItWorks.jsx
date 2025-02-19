const steps = [
  {
    id: 1,
    title: "Enter parcel details",
    description:
      "Provide essential details such as pickup and delivery locations, parcel weight, and delivery speed preferences.",
  },
  {
    id: 2,
    title: "Make payment & track",
    description:
      "Complete the payment securely and receive a tracking ID to monitor your parcel’s journey in real time.",
  },
  {
    id: 3,
    title: "Parcel delivered",
    description:
      "Your parcel is safely delivered to the destination. Receive proof of delivery and share feedback.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            How our parcel booking work?
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-text-600">
            Sending parcels is now easier than ever. Follow these simple steps
            to book and track your delivery seamlessly.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>
          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {steps.map((step) => (
              <div key={step.id}>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-secondary border-2 border-text-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-text-700">
                    {step.id}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-text md:mt-10">
                  {step.title}
                </h3>
                <p className="mt-4 text-base text-text-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
