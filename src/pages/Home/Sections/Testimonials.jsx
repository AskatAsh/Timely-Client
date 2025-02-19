const testimonialsData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Business Owner",
    company: "SwiftShip Logistics",
    feedback:
      "Booking and tracking my parcels has never been easier! The interface is user-friendly, and I always get real-time updates. Highly recommended!",
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Mark Benson",
    role: "E-commerce Seller",
    company: "QuickParcel",
    feedback:
      "This app has streamlined my shipping process. The automation features save me so much time, and my customers are happier than ever!",
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Freelancer",
    company: "FreightEase",
    feedback:
      "I love how easy it is to book a courier and track my deliveries. The notifications keep me updated every step of the way. A game-changer!",
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            Trusted by thousands of{" "}
            <span className="text-accent">happy customers</span>
          </h2>
        </div>

        <div className="grid max-w-xl grid-cols-1 mx-auto mt-8 text-center lg:max-w-full sm:mt-12 lg:mt-20 lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="overflow-hidden bg-secondary-300 rounded-xl shadow"
            >
              <div className="px-8 py-12 flex flex-col h-full">
                <div className="relative w-24 h-24 mx-auto">
                  <img
                    className="relative object-cover w-24 h-24 mx-auto rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="absolute top-0 right-0 flex items-center justify-center bg-accent-600 rounded-full w-7 h-7">
                    <svg
                      className="w-4 h-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
                    </svg>
                  </div>
                </div>
                <blockquote className="mt-7 flex-grow">
                  <p className="text-lg text-text">
                    &quot;{testimonial.feedback}&quot;
                  </p>
                </blockquote>
                <p className="text-base font-semibold text-text mt-9">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-base text-text-600">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
