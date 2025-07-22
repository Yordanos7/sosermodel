import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Debug: Log current language and footer links
  console.log("Current language:", i18n.language);
  console.log("Footer links:", t("footer.links", { returnObjects: true }));

  const footerLinks = t("footer.links", { returnObjects: true });

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-10 h-10 lg:w-12 lg:h-12 m-0 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
              />
              <span className="text-2xl font-bold">{t("navbar.logo")}</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPinIcon className="w-5 h-5 flex-shrink-0" />
                <span>{t("footer.contact.address")}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                <span>+251582211539</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:info@example.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  info@example.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <GlobeAltIcon className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://www.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  {t("footer.contact.website")}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaTelegramPlane className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://t.me/sosercoop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Telegram
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaFacebookF className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://web.facebook.com/people/Soser-Soser/pfbid02GijnHPcMtP8jJqDcczuaFTueDmiqDtgWThBWfQUA2NdLB5qRnRanXcE9ncFdcBEil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([categoryKey, category]) => (
            <div key={categoryKey}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t("footer.bottom.copyright", { year: currentYear })}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t("footer.bottom.privacy")}
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t("footer.bottom.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function WrappedFooter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Footer />
    </Suspense>
  );
}
