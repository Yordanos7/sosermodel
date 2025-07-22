import React, { useState, useEffect, Suspense, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  BanknotesIcon,
  NewspaperIcon,
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  PhoneIcon,
  CreditCardIcon,
  RocketLaunchIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: t("navbar.home"),
      path: "/",
      icon: HomeIcon,
    },
    {
      name: t("navbar.about_us"),
      icon: UserGroupIcon,
      dropdown: [
        { name: t("navbar.about.team"), path: "/about/team" },
        { name: t("navbar.about.mission_vision"), path: "/about/mission" },
        { name: t("navbar.about.partners"), path: "/about/partners" },
      ],
    },
    {
      name: t("navbar.services"),
      icon: BanknotesIcon,
      dropdown: [
        {
          name: t("navbar.services_dropdown.savings"),
          path: "/services/savings",
        },
        { name: t("navbar.services_dropdown.loans"), path: "/services/loans" },
        {
          name: t("navbar.services_dropdown.insurance"),
          path: "/services/insurance",
        },
        {
          name: t("navbar.services_dropdown.digital_banking"),
          path: "/services/digital",
        },
      ],
    },
    {
      name: t("navbar.news"),
      icon: NewspaperIcon,
      dropdown: [
        {
          name: t("navbar.news_dropdown.announcements"),
          path: "/news/announcements",
        },
        { name: t("navbar.news_dropdown.events"), path: "/news/events" },
        { name: t("navbar.news_dropdown.vacancies"), path: "/news/vacancies" },
      ],
    },
    {
      name: t("navbar.testimonials"),
      icon: ChatBubbleBottomCenterTextIcon,
      dropdown: [
        {
          name: t("navbar.testimonials_dropdown.documents"),
          path: "/testimonials/documents",
        },
        {
          name: t("navbar.testimonials_dropdown.success_stories"),
          path: "/testimonials/success",
        },
      ],
    },
    {
      name: t("navbar.multimedia"),
      icon: PhotoIcon,
      dropdown: [
        {
          name: t("navbar.multimedia_dropdown.gallery"),
          path: "/media/gallery",
        },
        { name: t("navbar.multimedia_dropdown.videos"), path: "/media/videos" },
      ],
    },
    {
      name: t("navbar.contact"),
      icon: PhoneIcon,
      dropdown: [
        {
          name: t("navbar.contact_dropdown.offices"),
          path: "/contact/offices",
        },
      ],
    },
    {
      name: t("navbar.payment"),
      path: "/payment",
      icon: CreditCardIcon,
    },
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        ref={navbarRef}
        initial={{ y: -100 }}
        animate={{
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={`fixed w-full z-50 transition-all duration-300 bg-[#90EE90] shadow-lg`}
      >
        <div className="w-full mx-auto">
          <div className="flex h-16 lg:h-20 items-center">
            {/* Logo and Language Switcher */}
            <div className="flex-shrink-0 flex items-center pl-4 lg:pl-6">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/favicon.ico"
                  alt="Logo"
                  className="w-7 h-7 lg:w-10 lg:h-10 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
                />
                <span className="text-sm lg:text-base font-bold text-gray-800 whitespace-nowrap hover:text-orange-500/70 hover:delay-75">
                  <span className="block">Soser Saving & Credit</span>
                  <span className="block">Cooperative Union LTD</span>
                </span>
              </Link>

              {/* Language Switcher (Desktop) */}
              <div className="hidden lg:block relative ml-4">
                <button
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-amber-500  transition-colors duration-200"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "language" ? null : "language"
                    )
                  }
                >
                  <span className="font-medium">
                    {i18n.language === "en" ? "EN" : "AM"}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "language" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "language" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    >
                      <button
                        onClick={() => changeLanguage("en")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-amber-500 transition-colors duration-200"
                      >
                        English
                      </button>
                      <button
                        onClick={() => changeLanguage("am")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-amber-500 transition-colors duration-200"
                      >
                        አማርኛ
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-between text-black h-full px-6">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.dropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="flex items-center px-3 py-2 text-gray-700 hover:text-amber-500  transition-colors duration-200 rounded">
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium -mr-1">{item.name}</span>
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-amber-500  transition-colors duration-200"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-1 px-3 py-2 transition-colors duration-200 rounded ${
                          location.pathname === item.path
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-amber-500 "
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium ml-1">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Get Started Button */}
              {user ? (
                <Link
                  to="/login"
                  className="ml-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full hover:text-amber-500  hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <RocketLaunchIcon className="w-4 h-4" />
                  <span className="font-medium">{t("navbar.login")}</span>
                </Link>
              ) : (
                <Link
                  to="/get-started"
                  className="ml-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full hover:text-amber-500  hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <RocketLaunchIcon className="w-4 h-4" />
                  <span className="font-medium">{t("navbar.get_started")}</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex-1 flex justify-end pr-4 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-[#90EE90] border-t border-gray-100"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {/* Language Switcher (Mobile) */}
                  <div className="px-3 py-2">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => changeLanguage("en")}
                        className={`px-3 py-1 rounded ${
                          i18n.language === "en"
                            ? "bg-blue-100 text-amber-500"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => changeLanguage("am")}
                        className={`px-3 py-1 rounded ${
                          i18n.language === "am"
                            ? "bg-blue-100 text-amber-500"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        አማርኛ
                      </button>
                    </div>
                  </div>

                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(item.name)}
                            className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center space-x-2">
                              <item.icon className="w-5 h-5" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronDownIcon
                              className={`w-4 h-4 transition-transform ${
                                activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-4 mt-1 space-y-1"
                              >
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                            location.pathname === item.path
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}

                  {user ? (
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md mx-3 mt-4"
                    >
                      <RocketLaunchIcon className="w-5 h-5" />
                      <span>{t("navbar.login")}</span>
                    </Link>
                  ) : (
                    <Link
                      to="/get-started"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md mx-3 mt-4"
                    >
                      <RocketLaunchIcon className="w-5 h-5" />
                      <span>{t("navbar.get_started")}</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default function WrappedNavbar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
    </Suspense>
  );
}
