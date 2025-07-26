import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";
import v4 from "../assets/v4.mp4";
import v5 from "../assets/v5.mp4";

import ashishImg from "../assets/ashish.jpg";
import tanmayImg from "../assets/tanmay.jpg";
import puravImg from "../assets/purav.jpg";
import adityaImg from "../assets/aditya.jpg";

const videos = [v1, v2, v3, v4, v5];

const testimonials = [
  {
    quote: "Fokus—naam hi nahi, ek vibe hai! The branding, the taste, the whole energy of it is so addictive that it’s effortlessly becoming my daily companion.",
    name: "Ashish Chanchlani",
    title: "Creator & Fan",
    image: ashishImg,
  },
  {
    quote: "Being among the first to try Fokus, I knew from the first sip—this wasn’t just a drink; it was an experience! Now, I proudly say I’m its biggest fan.",
    name: 'Tanmay "Scout"',
    title: "Creator & Early Adopter",
    image: tanmayImg,
  },
  {
    quote: "Is 400 ml ki bottle mein itni cheezein hai! Gym se lekar shoot tak, har jagah Fokus mera saath dega to keep me going all day long.",
    name: "Purav Jha",
    title: "Fitness Creator & Actor",
    image: puravImg,
  },
  {
    quote: "Just like my songs, log Fokus ke fan hone wale hain! I absolutely love the strawberry watermelon flavour—it’s the perfect blend of taste!",
    name: "Aditya Rikhari",
    title: "Singer & Influencer",
    image: adityaImg,
  },
];

const MidBanner = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const videoTimer = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(videoTimer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <section className="bg-[#f8f9fa] py-12 px-4 mt-[120px] text-[#1E1E1E]">
      {/* mt-[120px] prevents overlap with fixed navbar */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Bento 1: Comparison Table */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-xl border-t-8 border-[#F25774]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-extrabold mb-4 text-[#D98E04]">
            Why Choose <span className="text-[#1E1E1E]">FOKUS?</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm">
              <thead>
                <tr className="bg-[#F25774] text-white">
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">FOKUS</th>
                  <th className="p-3 text-left">Energy Drink</th>
                  <th className="p-3 text-left">Sports Drink</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Caffeine", "None", "High (80–300mg)", "Low/Moderate"],
                  ["Added Sugars", "No", "Yes", "Yes"],
                  ["Health Benefits", "Vitamins + Nootropics", "Quick Boost Only", "Electrolytes Only"],
                  ["Electrolytes", "Coconut Water + Salt", "Unbalanced", "Balanced"],
                ].map(([category, fokus, energy, sports], i) => (
                  <tr key={i} className="border-t border-gray-200 hover:bg-[#fef9f2]">
                    <td className="p-3 font-semibold">{category}</td>
                    <td className="p-3">{fokus}</td>
                    <td className="p-3">{energy}</td>
                    <td className="p-3">{sports}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bento 2: Video Card */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-xl flex items-center justify-center border-t-8 border-[#A3D952]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={videoIndex}
              className="w-[260px] h-[400px] rounded-3xl overflow-hidden border-4 border-[#D98E04]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <video
                src={videos[videoIndex]}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bento 3: Testimonials */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-xl border-t-8 border-[#F20505]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-[#F20505] mb-4">What People Say</h3>
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src={testimonials[testimonialIndex].image}
                alt={testimonials[testimonialIndex].name}
                className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-[#F25774]"
              />
              <p className="italic text-base mb-3">“{testimonials[testimonialIndex].quote}”</p>
              <p className="font-semibold text-[#F25774]">
                — {testimonials[testimonialIndex].name}
              </p>
              <p className="text-sm text-gray-500">{testimonials[testimonialIndex].title}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MidBanner;
