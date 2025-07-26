import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import founder1 from "../assets/founder1.jpg";
import founder2 from "../assets/founder2.jpg";
import founder3 from "../assets/founder3.jpg";
import founder4 from "../assets/founder4.jpg";
import founder5 from "../assets/founder5.jpg";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const founders = [
  {
    name: "Ankit Madaan",
    title: "Founder & CEO",
    image: founder1,
    socials: {
      Instagram: "https://www.instagram.com/ankitmadaan/",
      linkedin: "https://www.linkedin.com/in/ankitmadaan1/",
    },
  },
  {
    name: "Mayank Mishra",
    title: "Founder & COO",
    image: founder2,
    socials: {
      Instagram: "https://www.instagram.com/mrmayankm/",
      linkedin: "https://www.linkedin.com/in/mayank-mishra-73a14615a/",
    },
  },
  {
    name: "Aman Madaan",
    title: "Co‑Founder, CFO",
    image: founder3,
    socials: {
      Instagram: "https://www.instagram.com/storyteller.am/",
      linkedin: "https://www.linkedin.com/in/aman-madaan-23358230a/",
    },
  },
  {
    name: "Nischay Malhan",
    title: "Co‑Founder",
    image: founder4,
    socials: {
      Instagram: "https://www.instagram.com/triggeredinsaan/",
      Youtube: "https://www.youtube.com/@letsfokuschannel",
    },
  },
  {
    name: "Abhishek Malhan",
    title: "Co‑Founder",
    image: founder5,
    socials: {
      Instagram: "https://www.instagram.com/fukra_insaan/",
      Youtube: "https://www.youtube.com/@FukraInsaan",
    },
  },
];

const carouselSlides = [
  {
    title: "The Secret Sauce of Fokus",
    content: [
      "Vitamin D3 - Tackling India’s vitamin D shortage, one bottle at a time.",
      "No Sugar - Healthy can taste amazing! Get all the taste without the added sugar.",
      "Coconut Water (22%) - Because who wouldn’t want a mini beach vacation with every sip?",
    ],
    bg: "#F25774",
  },
  {
    title: "Cool Look, Cooler Conscience",
    content: [
      "Our branding isn’t just easy on the eyes—it’s designed to make you feel great too.",
      "Every bottle of Fokus stands out and tells a story.",
      "100% recyclable plastic bottle—you can sip guilt-free!",
    ],
    bg: "#A3D952",
  },
  {
    title: "The #GetFokus Revolution",
    content: [
      "With Abhishek and Nischay Malhan leading the charge—we’re creating a movement.",
      "#GetFokus isn’t just a hashtag; it’s a tribe.",
      "Join in, form Fokus groups, and take over the world—one focused moment at a time.",
    ],
    bg: "#F2C12E",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Top Curve */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full h-32">
          <path
            fill="#F2C12E"
            d="M0,32L48,42.7C96,53,192,75,288,96C384,117,480,139,576,144C672,149,768,139,864,138.7C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="text-center pt-0 pb-8 px-4">

        <h1 className="text-5xl font-extrabold text-[#F2C12E] mb-4">About Fokus</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-300">
          Fokus isn’t just a drink—it’s a lifestyle upgrade. Designed to sharpen your mind and refresh your soul, Fokus fuels a new generation of creators, learners, and dreamers.
        </p>
      </div>

      {/* Founders Section */}
      <section className="bg-[#1f1e1e] text-white pt-4 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#F2C12E] mb-4">Meet the Founders</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We’re more than just a brand—we’re a vibrant community driven by passion, purpose, and a shared vision for a better lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {founders.map((f, idx) => (
            <motion.div
              key={idx}
              className="bg-white text-black p-4 rounded-xl shadow-xl text-center transform transition-transform duration-300 hover:scale-105 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <img
                src={f.image}
                alt={f.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3 border-4 border-[#F2C12E]"
              />
              <h4 className="font-semibold text-lg">{f.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{f.title}</p>

              {/* Hover Reveal Overlay */}
              <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center rounded-xl">
                <h4 className="font-bold text-xl mb-1">{f.name}</h4>
                <p className="text-sm text-gray-700 mb-2">{f.title}</p>
                <div className="flex gap-4 justify-center text-xl mt-2">
                  {f.socials?.Instagram && (
                    <a href={f.socials.Instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="text-pink-500" />
                    </a>
                  )}
                  {f.socials?.linkedin && (
                    <a href={f.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="text-blue-600" />
                    </a>
                  )}
                  {f.socials?.Youtube && (
                    <a href={f.socials.Youtube} target="_blank" rel="noopener noreferrer">
                      <FaYoutube className="text-red-600" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Carousel */}
      <div className="pt-8 pb-16 px-4">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="max-w-5xl mx-auto"
        >
          {carouselSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="rounded-2xl shadow-lg p-10 text-center"
                style={{ backgroundColor: slide.bg }}
                initial={{ rotate: -10, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-4 text-black">{slide.title}</h3>
                <ul className="text-black text-lg space-y-2">
                  {slide.content.map((c, idx) => (
                    <li key={idx} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom Curve */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full h-32">
          <path
            fill="#F2C12E"
            d="M0,288L48,266.7C96,245,192,203,288,181.3C384,160,480,160,576,154.7C672,149,768,139,864,160C960,181,1056,235,1152,229.3C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default AboutPage;




