import React from "react";
import { motion } from "framer-motion";
import {
  EyeIcon,
  RocketLaunchIcon,
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Mission = () => {
  const { user } = useAuth();
  const values = [
    {
      icon: HeartIcon,
      title: "Community First",
      description:
        "We prioritize the needs and wellbeing of our communities in every decision we make.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Trust & Integrity",
      description:
        "We maintain the highest standards of transparency and ethical conduct in all our operations.",
    },
    {
      icon: UserGroupIcon,
      title: "Inclusive Growth",
      description:
        "We believe in creating opportunities for everyone, regardless of their background or circumstances.",
    },
    {
      icon: GlobeAltIcon,
      title: "Innovation",
      description:
        "We embrace technology and innovation to deliver better financial services to our members.",
    },
  ];

  const goals = [
    {
      title:
        "Empowering the union to be outshined and mandated in the affairs of its members in many Aspects.",
      description: "",
      progress: 60,
    },
    {
      title:
        "    Assessing the financial industry & utilizing best opportunities in asset formation  ",
      description: "",
      progress: 65,
    },
    {
      title:
        "Building the capacity & in turn capacitating members ,Building agricultural business projects in rural areas like oilseed crushers, tractors finance  schemes for plough , selected animals breeding  schemes, poultry ,grain mills, cultured fishing ,bee management, warehouse building, irrigation schemes  etc.",
      description: "",
      progress: 70,
    },
    {
      title:
        "Creating, building and managing competitive environments among different members to enhance their service capacities",
      description: "",
      progress: 80,
    },
    {
      title:
        "Building luxuries transportation/ communication system between members and the union",
      description: "",
      progress: 70,
    },
    {
      title:
        "Enabling members to be manned with competent and diligent employees",
      description: "",
      progress: 50,
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20"
        style={{
          backgroundImage: "url('/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto bg-orange-400 bg-opacity-50 p-6 rounded-lg"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission & Vision
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Driving financial inclusion and community prosperity across
              Ethiopia through innovative cooperative banking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <RocketLaunchIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Addressing the social and economic issues faced by members and
                their communities by offering financial products and services
                that members can manage independently and that are not overly
                complicated to access.
              </p>
              <ul className="space-y-3"></ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <EyeIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Becoming a leading cooperative bank that is continuously
                accessible, preferred, and popular.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide our actions and decisions as we
              work towards our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Strategic Goals 2025 - 2030GC
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our roadmap to achieving greater impact and serving more
              communities across Ethiopia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {goal.title}
                </h3>
                <p className="text-gray-600 mb-4">{goal.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {user ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Give us your message or comment
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Your feedback is important to us. Let us know how we can
                  improve our services.
                </p>
                <button
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => navigate("/contact/offices")}
                >
                  Contact Us
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Join Our Mission
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Be part of the movement that's transforming financial services
                  in Ethiopia. Together, we can build stronger communities.
                </p>
                <button
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => navigate("/get-started")}
                >
                  Become a Member
                </button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
