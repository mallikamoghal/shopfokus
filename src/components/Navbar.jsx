import { useCart } from "../context/CartContext";
import { FaBars } from "react-icons/fa";
import {
  MdHome,
  MdInfo,
  MdContactPage,
  MdLocalDrink,
  MdShoppingCart,
} from "react-icons/md";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { cartItem } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (learnOpen) setLearnOpen(false);
  };

  const toggleLearn = () => {
    setLearnOpen(!learnOpen);
    if (menuOpen) setMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", to: "/", icon: <MdHome /> },
    { name: "Products", to: "/products", icon: <MdLocalDrink /> },
    { name: "About", to: "/about", icon: <MdInfo /> },
    { name: "Contact", to: "/contact", icon: <MdContactPage /> },
    { name: "Cart", to: "/cart", icon: <MdShoppingCart /> },
  ];

  return (
    <>
      {/* Fixed Top Navbar */}
      <div className="relative z-50">
        <div className="bg-[#F25774] text-white fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4 relative">

            {/* Mobile Menu Icon */}
            <div className="md:hidden z-50">
              <button onClick={toggleMenu} className="text-2xl text-white">
                <FaBars />
              </button>
            </div>

            {/* Logo Centered */}
            <Link
              to="/"
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
            >
              <img
                src="https://fokus.shop/cdn/shop/files/RGB_Digital_Use__Fokus_Logo_Black.png?v=1718300315&width=140"
                alt="FOKUS Logo"
                className="h-10 object-contain"
              />
            </Link>

            {/* Learn More Button on Right */}
            <div className="ml-auto z-20">
              <button
                onClick={toggleLearn}
                className="px-4 py-2 bg-white text-[#F25774] rounded-md font-semibold shadow hover:bg-pink-50 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Curved Bottom Border */}
          <div className="w-full overflow-hidden leading-[0] relative">
            <svg
              className="block w-full h-[60px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
            >
              <path
                fill="#fff4f6"
                d="M0,64L48,53.3C96,43,192,21,288,26.7C384,32,480,64,576,69.3C672,75,768,53,864,53.3C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Learn More Dropdown */}
      {learnOpen && (
        <div className="fixed top-[100px] right-4 w-[820px] bg-white border border-pink-200 rounded-3xl shadow-lg transition-all duration-300 p-6 grid grid-cols-2 md:grid-cols-3 gap-4 z-40">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.to}
              key={index}
              onClick={() => setLearnOpen(false)}
              className="p-4 rounded-[30px] bg-[#fef4f5] hover:bg-[#fdecef] border border-pink-100 shadow transition-all hover:scale-[1.04] flex flex-col items-start gap-2 relative"
            >
              <div className="text-2xl text-[#F25774]">{item.icon}</div>
              <p className="font-bold text-[#D80032]">{item.name}</p>
              <p className="text-sm text-gray-600">
                Learn more about {item.name.toLowerCase()}.
              </p>
              {item.name === "Cart" && cartItem.length > 0 && (
                <span className="absolute top-2 right-3 bg-[#F25774] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cartItem.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </NavLink>
          ))}

          {/* Auth */}
          <div className="p-4 rounded-[30px] bg-[#fef4f5] hover:bg-[#fdecef] border border-pink-100 shadow transition-all flex flex-col justify-center items-start">
            <SignedOut>
              <SignInButton>
                <button className="text-[#D80032] font-semibold hover:underline">
                  Sign In
                </button>
              </SignInButton>
              <p className="text-sm text-gray-500 mt-1">Access your FOKUS account.</p>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <p className="text-sm text-gray-500 mt-1">Welcome back!</p>
            </SignedIn>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg p-5 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu</h2>
            <CgClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>
          <ul className="space-y-5 text-lg">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.to} onClick={toggleMenu}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <SignedOut>
                <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
