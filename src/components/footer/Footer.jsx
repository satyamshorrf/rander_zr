import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Facebook, Youtube, Instagram } from "lucide-react";
import myContext from "../../context/data/myContext";

const Footer = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ScrollToTopLink = ({ to, children, className }) => (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );

  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: mode === "dark" ? "#2E3137" : "#F3F4F6",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <div className="max-w-6xl mx-auto lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <ScrollToTopLink
            to="/"
            className="text-2xl font-bold items-center space-x-2 flex justify-center lg:justify-start"
          >
            <img
              src="https://res.cloudinary.com/dt5913iha/image/upload/v1738552794/ic_launcher_q4uzg5.png"
              alt=""
              height={50}
              width={50}
            />
            Zytra Relif
          </ScrollToTopLink>
          <p className="mt-4 text-sm sm:text-base text-center lg:text-left">
            Your trusted platform for professional home services.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap lg:flex-nowrap lg:justify-between gap-8 mt-8">
        <div className="w-full text-center lg:text-left lg:w-1/4">
          <h3 className="text-xl font-semibold">Learn More</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <ScrollToTopLink to="/about">About us</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/terms">Terms & conditions</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/privacy-policy">
                Privacy policy
              </ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/anti-discrimination-policy">Privacy policy</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/impact">ZR Impact</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/careers">Careers</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/help-centre">Help Centre</ScrollToTopLink>
            </li>
          </ul>
        </div>

        <div className="w-full text-center lg:text-left lg:w-1/4">
          <h3 className="text-xl font-semibold">For customers</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <ScrollToTopLink to="/reviews">ZR reviews</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/near-me">Categories near you</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/blog">Blog</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/contact-us">Contact us</ScrollToTopLink>
            </li>
            <li>
              <ScrollToTopLink to="/addresses">View addresses</ScrollToTopLink>
            </li>
          </ul>
        </div>

        <div className="w-full text-center lg:text-left lg:w-1/4">
          <h3 className="text-xl font-semibold">For partners</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <ScrollToTopLink to="https://partner.zytrarelif.com">
                Register as a professional
              </ScrollToTopLink>
            </li>
          </ul>
        </div>

        <div className="w-full text-center lg:text-left lg:w-1/4">
          <h3 className="text-xl font-semibold">Connect With Us</h3>
          <div className="flex space-x-4 items-center mt-4 justify-center lg:justify-start">
            <ScrollToTopLink to="https://www.youtube.com/@zytrarelif">
              <Youtube />
            </ScrollToTopLink>
            <ScrollToTopLink to="https://www.instagram.com/zytrarelif/">
              <Instagram />
            </ScrollToTopLink>
            <ScrollToTopLink to="https://www.facebook.com/zytrarelif/">
              <Facebook />
            </ScrollToTopLink>
          </div>

          <p className="mt-4 text-sm sm:text-base">
            Email:{" "}
            <a
              href="mailto:support@example.com"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              support@zytrarelif.com
            </a>
          </p>

          <div className="flex space-x-4 items-center mt-4 justify-center lg:justify-start">
            <ScrollToTopLink to="/coming-soon">
              <img
                src="https://res.cloudinary.com/dt5913iha/image/upload/v1738552821/google-play-badge_oq5sq9.webp"
                alt="Get it on Google Play"
              />
            </ScrollToTopLink>
            <ScrollToTopLink to="/coming-soon">
              <img
                src="https://res.cloudinary.com/dt5913iha/image/upload/v1738552810/app-store-badge_ug87at.webp"
                alt="Download on the App Store"
              />
            </ScrollToTopLink>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t max-w-4xl mx-auto text-center">
        <p className="text-xs">&copy; 2025 ZytraRelif. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
