import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I open a savings account with Sosser?",
      answer:
        "You can open a savings account by visiting any of our branches with a valid ID, proof of address, and minimum deposit. You can also start the process online through our 'Get Started' page and complete it at a branch.",
    },
    {
      question: "Can I use TeleBirr to make payments?",
      answer:
        "Yes! We fully support TeleBirr payments. You can use TeleBirr for deposits, loan payments, and other banking transactions. Visit our Payment page for step-by-step instructions.",
    },
    {
      question: "What are your interest rates for loans?",
      answer:
        "Our loan interest rates vary depending on the type of loan and duration. Personal loans start at 15% annually, agricultural loans at 12%, and business loans at 18%. Contact us for personalized rate quotes.",
    },
    {
      question: "How can I check my account balance?",
      answer:
        "You can check your balance through our mobile app, online banking portal, at any branch, or by calling our customer service. We also offer SMS balance inquiry services.",
    },
    {
      question: "What insurance services do you offer?",
      answer:
        "We offer health insurance, property insurance, and life insurance products. Our insurance services are designed to protect you and your family from unexpected financial burdens.",
    },
    {
      question: "Is my money safe with Sosser?",
      answer:
        "Absolutely! Your deposits are protected by government insurance up to 250,000 ETB. We also employ advanced security measures and are regulated by Ethiopian financial authorities.",
    },
    {
      question: "How do I apply for a loan?",
      answer:
        "You can apply for a loan online through our website, visit any branch, or call our loan officers. You'll need to provide income proof, collateral information, and complete our application form.",
    },
    {
      question: "Do you have mobile banking?",
      answer:
        "Yes! Our mobile banking app offers full account management, transfers, bill payments, and more. Download it from Google Play Store or Apple App Store.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "Our branches are open Monday to Friday, 8:00 AM to 5:00 PM, and Saturday 8:00 AM to 12:00 PM. Our digital services are available 24/7.",
    },
    {
      question: "How can I become a member of the cooperative?",
      answer:
        "Membership is open to all eligible individuals. Visit our 'Get Started' page to begin the registration process, or visit any of our branches with the required documents.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Find answers to common questions about our services, processes,
              and policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDownIcon
                      className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you with any questions
              not covered above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200"
              >
                Contact Support
              </Link>
              <Link
                to="/contact/offices"
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Visit Office
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
