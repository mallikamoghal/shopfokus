import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#A3D952] text-black font-[Inter] relative mt-auto">
      {/* Curvy top SVG line */}
      <svg
        viewBox="0 0 1440 100"
        className="absolute top-0 left-0 w-full"
        preserveAspectRatio="none"
      >
        <path
          fill="none"
          stroke="#F2C12E"
          strokeWidth="3"
          d="M0,64L80,58.7C160,53,320,43,480,64C640,85,800,139,960,128C1120,117,1280,43,1360,5.3L1440,0"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand Info */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">FOKUS</h1>
          </Link>
          <p className="mt-2 text-sm">
            Functional hydration for the modern lifestyle. Clean, bold, and tasty.
          </p>
          <p className="mt-2 text-sm">Email: hello@fokus.shop</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/track">Track Order</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl text-black">
            <a href="https://www.instagram.com/fokus/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/fokusdrinks/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com/fokus" target="_blank" rel="noopener noreferrer"><FaTwitterSquare /></a>
            <a href="https://www.pinterest.com/search/pins/?q=fokus%20drinks" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <p className="mt-2 text-sm">Get product updates and exclusive offers.</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 rounded-l-md bg-white text-black placeholder-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#F25774] text-white px-4 rounded-r-md hover:bg-[#F20505] transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-4 border-t border-[#D98E04] text-sm relative z-10">
        &copy; {new Date().getFullYear()} <span className="font-bold">FOKUS</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
