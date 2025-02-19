import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button on the homepage, fill in your details, and verify your email address to complete registration.",
    },
    {
      question: "How can I make a payment using PayPal?",
      answer:
        "You can make a payment via PayPal by selecting 'PayPal' as your payment method during checkout and logging into your PayPal account to complete the transaction.",
    },
    {
      question: "Can I cancel my plan?",
      answer:
        "Yes, you can cancel your plan at any time from your account settings. Refund policies may apply depending on your subscription type.",
    },
    {
      question: "How can I reach support?",
      answer:
        "Our support team is available 24/7. You can reach us via the 'Contact Support' button or email us at support@parcelapp.com.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-text-600">
            Find answers to common questions about our parcel management system.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-200 bg-background border border-secondary-800 rounded-lg cursor-pointer hover:bg-secondary-300 ${
                openIndex === index ? "shadow-lg" : ""
              }`}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 pt-5"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-text text-left">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-400 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`pb-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 opacity-100 px-4 pt-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-text-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-text-600 text-base mt-9">
          Didn’t find the answer you are looking for?{" "}
          <a
            href="#"
            title="Contact Support"
            className="font-medium text-primary-600 transition-all duration-200 hover:text-primary-700 focus:text-primary-700 hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
