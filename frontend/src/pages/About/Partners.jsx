import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { t } = useTranslation();

  const partners = [
    {
      id: 1,
      name: "Admas multipurpose cooperatives union",
      category: t("partners.categories.Union"),
      logo: "/p4.png",
    },
    {
      id: 2,
      name: "Wura saving and credit cooperatives union Ltd.",
      category: t("partners.categories.Union"),
      logo: "/p3.png",
    },
    {
      id: 3,
      name: "Development Bank of Ethiopia",
      category: t("partners.categories.Union"),
      logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Development_Bank_of_Ethiopia.png",
    },
    {
      id: 4,
      name: "Cord aid Ethiopia",
      category: t("partners.categories.NGOs"),
      logo: "/p2.png",
    },
    {
      id: 5,
      name: "FINISH Mondial",
      category: t("partners.categories.NGOs"),
      logo: "/p1.png",
    },
    {
      id: 6,
      name: "KOKEB SACCOOP UNION LTD",
      category: t("partners.categories.Union"),
      description: "Financial services for cooperatives and SMEs.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpsq0a0ATvQkbR8rjBDXam4wGY8PNDkDNOQ&s",
      website: "https://coopbankoromia.com.et/",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("partners.header.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t("partners.header.description")}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-32 mb-6">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full object-contain max-w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Logo+Not+Found";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {partner.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                    partner.category === t("partners.categories.Union")
                      ? "bg-blue-100 text-blue-800"
                      : partner.category === t("partners.categories.NGOs")
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {partner.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("partners.partnership_benefits.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t("partners.partnership_benefits.items", {
              returnObjects: true,
            }).map((benefit, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 ${
                    [
                      "bg-blue-100",
                      "bg-green-100",
                      "bg-yellow-100",
                      "bg-purple-100",
                    ][index]
                  } rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-2xl">
                    {["🌐", "💡", "🤝", "📈"][index]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
