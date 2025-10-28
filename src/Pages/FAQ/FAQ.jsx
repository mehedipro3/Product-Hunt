import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I post a new product?",
      answer:
        "Go to your dashboard and click the 'Add Product' button. Fill in the required details such as name, description, and image, then submit it for review.",
    },
    {
      question: "Can I update or delete my product later?",
      answer:
        "Yes. Visit the 'My Products' section in your dashboard. You can easily update or delete any product you’ve posted.",
    },
    {
      question: "What does 'Pending' status mean?",
      answer:
        "A 'Pending' status means your product submission is waiting for admin approval. Once reviewed, it will change to 'Accepted' or 'Rejected'.",
    },
    {
      question: "Is my data safe on this platform?",
      answer:
        "Absolutely. We use secure authentication, encrypted connections, and data validation to ensure your information remains private and safe.",
    },
    {
      question: "Who can I contact for support?",
      answer:
        "You can reach out to our support team via the 'Contact' page or email us at support@youthvoicebd.org for any assistance.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            tabIndex={0}
            className={`collapse collapse-plus border border-gray-200 rounded-xl bg-base-100 shadow-md transition-all duration-200 ${
              openIndex === index ? "bg-blue-50 border-blue-300" : ""
            }`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="collapse-title text-lg font-semibold text-gray-800">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-600 leading-relaxed">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
