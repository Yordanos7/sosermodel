import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BanknotesIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Chart from "chart.js/auto";
import { getAnnouncements } from "../api/announcement";
import { getEvents } from "../api/event";
import { useAuth } from "../context/AuthContext";
import SoserChatAssistant from "./SoserChatAssistant";
import Lottie from "lottie-react";
import ai from "../locales/ai.json";
import useCountUp from "../hooks/useCountUp";

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const fullText = t("home.hero.title_typed");

  const heroImages = ["./1.png", "./2.png", "./3.png", "./6.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        setTimeout(() => {
          index = 0;
          setTypedText("");
        }, 1000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const services = [
    {
      icon: BanknotesIcon,
      title: t("home.services.items.savings.title"),
      description: t("home.services.items.savings.description"),
      link: "/services/savings",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: DocumentTextIcon,
      title: t("home.services.items.loans.title"),
      description: t("home.services.items.loans.description"),
      link: "/services/loans",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: ShieldCheckIcon,
      title: t("home.services.items.insurance.title"),
      description: t("home.services.items.insurance.description"),
      link: "/services/insurance",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: t("home.services.items.digital_banking.title"),
      description: t("home.services.items.digital_banking.description"),
      link: "/services/digital",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchAnnouncements();
    fetchEvents();
  }, []);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
          ],
          datasets: [
            {
              label: t("home.growth_insights.chart_label"),
              data: [
                26, 32, 41, 50, 55, 69, 77, 103, 111, 123, 158, 296, 301, 335,
                386, 427,
              ],
              borderColor: "rgba(16, 185, 129, 1)",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              fill: true,
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: t("home.growth_insights.chart_y_axis"),
              },
            },
            x: {
              title: {
                display: true,
                text: t("home.growth_insights.chart_x_axis"),
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [t]);

  const [totalLoanRef, totalLoanCount] = useCountUp(1413361693.7);
  const [shortTermLoanRef, shortTermLoanCount] = useCountUp(40661181.81);
  const [mediumTermLoanRef, mediumTermLoanCount] = useCountUp(1372700511.89);

  const [totalSavingRef, totalSavingCount] = useCountUp(425351883.88);
  const [regularSavingRef, regularSavingCount] = useCountUp(16223739.3);
  const [voluntarySavingRef, voluntarySavingCount] = useCountUp(147646226.25);
  const [contractualSavingRef, contractualSavingCount] =
    useCountUp(232110490.9);
  const [currentSavingRef, currentSavingCount] = useCountUp(29371427.43);

  const formatNumber = (num, isAnimating) => {
    if (isAnimating) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
      }
    }
    return new Intl.NumberFormat("en-US").format(num.toFixed(2));
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="pt-4 lg:pt-8 w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50 cursor-pointer sm:bottom-6 sm:right-6"
      >
        <Lottie
          animationData={ai}
          loop={true}
          className="w-16 h-16 sm:w-20 sm:h-20 hover:shadow-lg rounded-full"
          onClick={toggleChat}
        />
      </motion.div>

      {showChat && <SoserChatAssistant onClose={() => setShowChat(false)} />}

      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full">
          <motion.div
            key={currentSlide}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <img
              src={heroImages[currentSlide]}
              alt="Soser Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/70 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-r from-orange-500/0 via-orange-500/70 to-orange-500/0 clip-path-[polygon(0%_0%,_100%_0%,_100%_100%,_0%_80%)]"></div>
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center w-full">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl w-full"
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {t("home.hero.title_part1")}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-2 sm:mt-4">
                  {typedText}
                </span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-8 max-w-2xl">
                {t("home.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-1 sm:space-x-2 w-full sm:w-auto"
                >
                  <span>{t("home.hero.get_started")}</span>
                  <ArrowRightIcon className="w-3 sm:w-5 h-3 sm:h-5" />
                </Link>
                <Link
                  to="/about/mission"
                  className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  {t("home.hero.learn_more")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              {t("home.about.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Soser Saving & Credit Conditional Union LTD is a membership-based
              financial cooperative dedicated to providing innovative savings,
              loan, and insurance services established for local development. We
              are committed to digital transformation and inclusive banking,
              empowering our members across the Amhara Region to achieve
              financial prosperity and resilience. The name Soser is inspired by
              Mount Soser, a prominent local landmark located at the border
              between Dangila and Fagita Lekoma woredas. Soser Saving & Credit
              Cooperative Union LTD was officially established on March 24, 2008
              (G.C) and certified by the ANRS Cooperative Agency under
              registration code 02/1729 on June 19, 2008 (G.C). The union was
              founded by 23 primary cooperative societies, with an initial
              paid-up capital of 666,000.00 ETB and a total membership of 28,194
              individuals—23,775 male and 4,419 female members.
            </p>
            <Link
              to="/about/mission"
              className="inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300"
            >
              <span>{t("home.about.learn_more")}</span>
              <ChevronRightIcon className="w-3 sm:w-4 h-3 sm:h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-4 sm:mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
              {t("home.services.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.services.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden group"
                whileHover={{
                  y: -10,
                  backgroundColor: "#ff8c42",
                  transition: { duration: 0.4, delay: 0.2 },
                }}
              >
                <div className="p-4 sm:p-6">
                  <div
                    className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${service.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    <span>
                      {t(
                        `home.services.items.${
                          Object.keys(
                            t("home.services.items", { returnObjects: true })
                          )[index]
                        }.link`
                      )}
                    </span>
                    <ArrowRightIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="loan-disbursement-section"
        className="py-8 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-8 md:mt-12 lg:mt-16"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">
              {t("home.growth_insights.title")}
            </h3>
            <div className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
              <div className="h-48 sm:h-64 md:h-80 lg:h-96">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-center"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
              Saving trend
            </h3>
            <div className="flex flex-col items-center justify-center mb-4 sm:mb-8 md:mb-12 lg:mb-16">
              <div className="text-center mb-2 sm:mb-4">
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-purple-600"
                >
                  <span ref={totalSavingRef}>
                    {formatNumber(totalSavingCount, true)}
                  </span>
                </motion.div>
                <p className="text-gray-500 mt-1 sm:mt-2">ETB</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
                <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-md sm:rounded-lg">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                    Regular
                  </h4>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600"
                  >
                    <span ref={regularSavingRef}>
                      {formatNumber(regularSavingCount, true)}
                    </span>
                  </motion.div>
                  <p className="text-gray-500">ETB</p>
                </div>

                <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-md sm:rounded-lg">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                    Voluntary
                  </h4>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600"
                  >
                    <span ref={voluntarySavingRef}>
                      {formatNumber(voluntarySavingCount, true)}
                    </span>
                  </motion.div>
                  <p className="text-gray-500">ETB</p>
                </div>

                <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-md sm:rounded-lg">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                    Contractual
                  </h4>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600"
                  >
                    <span ref={contractualSavingRef}>
                      {formatNumber(contractualSavingCount, true)}
                    </span>
                  </motion.div>
                  <p className="text-gray-500">ETB</p>
                </div>

                <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-md sm:rounded-lg">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                    Current
                  </h4>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600"
                  >
                    <span ref={currentSavingRef}>
                      {formatNumber(currentSavingCount, true)}
                    </span>
                  </motion.div>
                  <p className="text-gray-500">ETB</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-4 sm:mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
              {t("Loan Disbursment")}
            </h2>
          </motion.div>

          <div className="flex flex-col items-center justify-center mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            <div className="text-center mb-2 sm:mb-4">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-blue-600">
                <span ref={totalLoanRef}>
                  {formatNumber(totalLoanCount, false)}
                </span>
              </div>
              <p className="text-gray-500 mt-1 sm:mt-2">ETB</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
              <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-md sm:rounded-lg">
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                  Short Term Loan
                </h4>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  <span ref={shortTermLoanRef}>
                    {formatNumber(shortTermLoanCount, false)}
                  </span>
                </div>
                <p className="text-gray-500">ETB</p>
              </div>

              <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-md sm:rounded-lg">
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                  Medium Term Loan
                </h4>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">
                  <span ref={mediumTermLoanRef}>
                    {formatNumber(mediumTermLoanCount, false)}
                  </span>
                </div>
                <p className="text-gray-500">ETB</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center mt-4 sm:mt-8 md:mt-12"
          >
            <div className="overflow-hidden shadow-md sm:shadow-xl">
              <img
                src="/2.png"
                alt="Soser Main Office Building"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-blue-50 p-2 sm:p-4 md:p-6 lg:p-8 rounded-md sm:rounded-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                Our Headquarters
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2 sm:mb-4 md:mb-6 leading-relaxed">
                Our headquarters, located in Dangla town, serves as the central
                hub for Soser Saving & Credit Cooperative Union LTD's
                operations. This facility supports our administrative functions
                and member services, ensuring we deliver accessible and reliable
                financial solutions to our members across seven districts. It
                reflects our commitment to fostering financial inclusion and
                empowering our community through straightforward and effective
                cooperative services.
              </p>
              <Link
                to="/contact/offices"
                className="inline-flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <span>Visit Our Locations</span>
                <ArrowRightIcon className="w-3 sm:w-4 h-3 sm:h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                {t("home.announcements.title")}
              </h2>
              <div className="space-y-2 sm:space-y-4">
                {announcements.slice(0, 3).map((announcement, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-md sm:rounded-lg p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-2 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <CalendarDaysIcon className="w-4 sm:w-6 h-4 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                          {new Date(
                            announcement.publishDate
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 sm:mt-4">
                <Link
                  to="/news/announcements"
                  className="inline-flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <span>{t("home.announcements.view_all")}</span>
                  <ArrowRightIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                {t("home.events.title")}
              </h2>
              <div className="space-y-2 sm:space-y-4">
                {events.slice(0, 3).map((event, index) => (
                  <div
                    key={index}
                    className="bg-green-50 rounded-md sm:rounded-lg p-2 sm:p-4 hover:bg-green-100 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-2 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <CalendarDaysIcon className="w-4 sm:w-6 h-4 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 sm:mt-4">
                <Link
                  to="/news/events"
                  className="inline-flex items-center space-x-1 sm:space-x-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  <span>{t("home.events.view_all")}</span>
                  <ArrowRightIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#90EE90]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="whitespace-nowrap"
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 inline-block">
              Saving is a symbol of progress. Save for growth, borrow with
              purpose, and repay on time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default function WrappedHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
