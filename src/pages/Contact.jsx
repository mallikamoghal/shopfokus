import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateEyePosition = (eyeX, eyeY) => {
    const dx = mousePos.x - eyeX;
    const dy = mousePos.y - eyeY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(15, Math.hypot(dx, dy) / 20);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const leftEyePos = calculateEyePosition(window.innerWidth / 2 - 50, window.innerHeight - 50);
  const rightEyePos = calculateEyePosition(window.innerWidth / 2 + 50, window.innerHeight - 50);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
    setShowContactModal(false);
  };

  return (
    <div className="relative min-h-screen bg-[#fffaf5] overflow-hidden font-sans">

      {/* Floating Buttons */}
      {["CONTACT US", "CONTACT", "SEND MESSAGE", "LOOK FORWARD"].map((text, i) => (
        <button
          key={i}
          onClick={() => setShowContactModal(true)}
          className="absolute z-20 bg-[#F25774] text-white font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform rotate-[-12deg]"
          style={{
            top: `${20 + i * 18}%`,
            left: `${i % 2 === 0 ? "20%" : "70%"}`,
          }}
        >
          {text}
        </button>
      ))}

      {/* Main Title */}
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <motion.h1
          className="text-7xl font-extrabold leading-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#A3D952]">Don't</span> <br />
          <span className="text-[#F25774]">Hesitate</span> <br />
          <span className="text-gray-800">to Reach Out!</span>
        </motion.h1>
      </div>

      {/* Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white border rounded-2xl p-10 w-full max-w-4xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-[#A3D952]">
                Get in Touch with <span className="text-[#F25774]">FOKUS</span>
              </h2>
              <button onClick={() => setShowContactModal(false)} className="text-2xl text-gray-600 hover:text-red-400">&times;</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-4 text-gray-700 text-sm">
                <motion.div
                  className="flex items-center gap-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaMapMarkerAlt className="text-[#A3D952] text-xl" />
                  <p>4004, DLF Phase 4, Gurgaon, Haryana, 122002</p>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <FaEnvelope className="text-[#F25774] text-xl" />
                  <p>care@fokus.shop</p>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  <FaPhoneAlt className="text-[#A3D952] text-xl" />
                  <p>+91 9319864109</p>
                </motion.div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "email", "message"].map((field, i) => (
                  <div key={i}>
                    <label className="block text-gray-700 mb-1 capitalize">
                      {field === "name" ? "Your Name" : field === "email" ? "Email" : "Message"}
                    </label>
                    {field === "message" ? (
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25774]"
                        placeholder="Type your message..."
                        required
                      ></textarea>
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A3D952]"
                        placeholder={field === "name" ? "John Doe" : "john@example.com"}
                        required
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-[#A3D952] hover:bg-[#88b83c] text-black font-semibold py-2 rounded-lg transition"
                >
                  Send Message 🚀
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Juice Footer (Eyes) */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40">
        <div className="w-64 h-32 bg-[#F25774] rounded-t-full relative shadow-md">
          <div className="absolute top-4 left-10 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div
              className="w-5 h-5 bg-black rounded-full transition-transform"
              style={{ transform: `translate(${leftEyePos.x}px, ${leftEyePos.y}px)` }}
            />
          </div>
          <div className="absolute top-4 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div
              className="w-5 h-5 bg-black rounded-full transition-transform"
              style={{ transform: `translate(${rightEyePos.x}px, ${rightEyePos.y}px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
