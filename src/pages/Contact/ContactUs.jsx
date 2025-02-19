import { Helmet } from "react-helmet-async";

const contactDetails = [
  {
    icon: (
      <svg
        className="flex-shrink-0 w-10 h-10 mx-auto text-primary-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    details: ["+1-800-555-1234", "+1-800-555-5678"],
  },
  {
    icon: (
      <svg
        className="flex-shrink-0 w-10 h-10 mx-auto text-primary-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    details: ["support@parcelbooker.com", "info@timely-delivery.com"],
  },
  {
    icon: (
      <svg
        className="flex-shrink-0 w-10 h-10 mx-auto text-primary-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    details: ["123 Parcel Lane, New York, NY 10001, USA"],
  },
];

const ContactUs = () => {
  return (
    <section className="py-10 bg-secondary-200 sm:py-16 lg:py-24">
      <Helmet>
        <title>Timely | Contact Us</title>
      </Helmet>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-text-900 sm:text-4xl lg:text-5xl">
            Contact us
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-text-500">
            Need help with your parcel booking? Our support team is available to
            assist you with any inquiries or issues.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
            {contactDetails.map((contact, index) => (
              <div
                key={index}
                className="overflow-hidden bg-background rounded-xl"
              >
                <div className="p-6">
                  {contact.icon}
                  {contact.details.map((detail, i) => (
                    <p
                      key={i}
                      className="mt-4 text-lg font-medium text-text-900"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
