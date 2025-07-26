import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import bottle from "../assets/bottle.jpg";
import kiwi from "../assets/kiwi.png";
import lemon from "../assets/lemon.png";
import strawberry from "../assets/strawberry.png";
import mango from "../assets/mango.png";
import pineapple from "../assets/pineapple.png";
import watermelon from "../assets/watermelon.png";

import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import MidBanner from "../components/MidBanner";
import BlobDivider from "../components/BlobDivider"; 


const fruits = [
  { src: kiwi, direction: "left" },
  { src: lemon, direction: "right" },
  { src: mango, direction: "left" },
  { src: pineapple, direction: "right" },
  { src: strawberry, direction: "left" },
  { src: watermelon, direction: "right" },
];

export default function HomePage() {
  const fruitRefs = useRef([]);
  const bottleRef = useRef(null);
  const textRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) return;

    const tl = gsap.timeline();

    tl.fromTo(
      bottleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    fruitRefs.current.forEach((el, i) => {
      const dir = fruits[i].direction === "left" ? -1 : 1;
      tl.fromTo(
        el,
        { x: 0, y: 0, opacity: 0, scale: 0 },
        {
          x: dir * gsap.utils.random(120, 180),
          y: gsap.utils.random(-40, -100),
          opacity: 1,
          scale: gsap.utils.random(0.8, 1.2),
          duration: 2,
          ease: "power2.out",
        },
        i * 0.2
      );
    });

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.5,
        ease: "power2.out",
      }
    );
  }, [imageLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col relative overflow-hidden scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-white shadow-md z-30">
        <h1 className="text-2xl font-bold text-pink-600">Fokus</h1>
        <div className="space-x-4 hidden md:flex">
          <a href="#products" className="text-pink-600 font-medium hover:underline">Products</a>
          <a href="#about" className="text-pink-600 font-medium hover:underline">About</a>
          <a href="#contact" className="text-pink-600 font-medium hover:underline">Contact</a>
        </div>
        <button className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
          Shop Now
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 relative flex flex-col items-center justify-center text-center pt-32">
        <div className="relative z-10">
          <img
            src={bottle}
            ref={bottleRef}
            alt="Fokus Bottle"
            className="w-[240px] md:w-[320px] mx-auto drop-shadow-2xl"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Fruit Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {fruits.map((fruit, i) => (
            <img
              key={i}
              src={fruit.src}
              ref={(el) => (fruitRefs.current[i] = el)}
              className="absolute w-12 md:w-16 object-contain"
              style={{
                left: "50%",
                top: "55%",
                transform: "translate(-50%, -50%)",
              }}
              alt="fruit"
            />
          ))}
        </div>

        <div ref={textRef} className="mt-10 max-w-xl px-4 z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">
            Refresh Naturally with Fokus
          </h2>
          <p className="text-md md:text-xl text-gray-600">
            Made from real fruits. Packed with vitamins. Taste the freshness.
          </p>
        </div>
      </header>

     {/* BLOB Curve to MidBanner */}
<BlobDivider fill="#F2C12E" />

<section className="min-h-[50vh] py-20 bg-[#F2C12E]">
  <MidBanner />
</section>

{/* Products Section */}
<section id="products" className="">
  <h2 className="text-4xl font-extrabold text-center pt-6 text-[#d98e04] mb-12">
    Our Products
  </h2>
  <Products />
</section>

{/* About Section */}
<BlobDivider fill="#e0ffe0" />
<section id="about" className="min-h-screen pt-4 pb-4 px-6 bg-[#e0ffe0]">
  <About />
</section>

{/* Contact Section */}
<BlobDivider fill="#fff0b3" flip />
<section id="contact" className=" pt-4 pb-4 px-6 bg-[#fff0b3]">
  <Contact />
</section>

      <footer className="py-8 text-center text-gray-500">
        © 2025 Fokus. All rights reserved.
      </footer>
    </div>
  );
}
