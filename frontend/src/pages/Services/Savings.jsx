import React from "react";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Savings = () => {
  const savingsAccounts = [
    {
      name: "Compulsory saving",
      icon: BanknotesIcon,
      features: [
        "A mandatory saving type",
        "Free online banking",
        "which can not withdrawn with out due purpose and members decision",
      ],
      gradient: "from-orange-300 to-orange-300",
    },
    {
      name: "Voluntary Saving",
      icon: ChartBarIcon,
      features: [
        "no tax which members can easily save and withdraw like most banks saving today",
      ],
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Contractual Saving",
      icon: UserGroupIcon,
      features: [
        "Contractual saving those saving based on agreement based on savers and the union certain terms and condition",
      ],
      gradient: "from-green-700 to-green-800",
    },
    {
      name: "current account",
      icon: UserGroupIcon,
      features: [
        "current account saving non interest bearing saving and very easy to withdraw.",
      ],
      gradient: "from-green-700 to-green-800",
    },
    {
      name: "Children saving",
      icon: UserGroupIcon,
      features: [
        "Children Saving a saving Type with similar conditions, but loos, like contractual savings",
      ],
      gradient: "from-green-700 to-green-800",
    },
    {
      name: "Special Savings",
      icon: UserGroupIcon,
      features: [
        "Financial literacy ",
        "Low minimum balance",
        "Educational resources",
        "Parental oversight options",
      ],
      gradient: "from-green-700 to-green-800",
    },
  ];

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Insurance Products",
      description:
        "Protects loan repayments in case of the debtor’s or their spouse’s death, including a funeral service benefit of 1,000 birr.",
    },
    {
      icon: CurrencyDollarIcon,
      title: "Variety of Savings Options",
      description:
        "Offers a 7% daily accrued interest with no tax, providing a secure and rewarding option for members who commit to long-term savings with restricted withdrawals.",
    },
    {
      icon: CalendarDaysIcon,
      title: "Diverse Service Offerings",
      description:
        "Soser provides a range of financial services tailored to cooperative societies, including savings, credit, insurance, training, and technical support. This comprehensive approach ensures members have access to multiple financial tools to meet their needs",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-gradient-to-r from-orange-300 to-green-600 py-20"
        style={{
          backgroundImage: `url(/save.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <BanknotesIcon className="w-16 h-16 mx-auto mb-6 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Savings Accounts
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-white/90">
                Secure your financial future with our comprehensive savings
                solutions. Earn competitive interest while keeping your money
                safe and accessible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Savings Account Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Choose Your Savings Account
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect savings account that matches your financial goals
              and lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savingsAccounts.map((account, index) => (
              <motion.div
                key={account.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`bg-gradient-to-r ${account.gradient} p-6 text-white`}
                >
                  <account.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{account.name}</h3>
                  <div className="flex items-center justify-between"></div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Features:
                  </h4>
                  <ul className="space-y-3">
                    {account.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold"
                    onClick={() => navigate("/get-started")}
                  >
                    Open Account
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0">
          <img
            src="https://trustlinkfinancial.com/wp-content/uploads/2023/09/savings.jpg"
            alt="Benefits of Sosser Savings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Sosser Savings?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  hover: { duration: 0.3 },
                }}
                viewport={{ once: true }}
                className="text-center bg-white bg-opacity-90 rounded-lg p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {benefit.title}
                </h3>
                <p className="text-black leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Saving Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Open your savings account online in minutes and start earning
              competitive returns on your money.
            </p>
            <button
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              onClick={() => navigate("/get-started")}
            >
              Open Savings Account
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Savings;
