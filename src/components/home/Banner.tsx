// components/HeroBanner.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaHome, FaSearch, FaCommentsDollar } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden shadow-2xl">

      <Image
  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  alt="Luxury Apartment"
  fill
  priority
  className="absolute inset-0 w-full h-full object-cover"
/>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          Find Your <span className="text-yellow-400">Perfect Rental</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 text-lg md:text-xl max-w-2xl text-gray-200"
        >
          Browse houses, apartments, and rooms tailored to your lifestyle.
          Connect with landlords instantly and book with ease.
        </motion.p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-yellow-400 text-indigo-900 font-semibold shadow-lg hover:bg-yellow-300 transition"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-white/90 text-indigo-800 font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Learn More
          </motion.button>
        </div>

        {/* Floating Icons */}
        <div className="mt-12 flex gap-8">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl text-yellow-300"
          >
            <FaHome size={36} />
          </motion.div>
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl text-green-300"
          >
            <FaSearch size={36} />
          </motion.div>
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl text-pink-300"
          >
            <FaCommentsDollar size={36} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
