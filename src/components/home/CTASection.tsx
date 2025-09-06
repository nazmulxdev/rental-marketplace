"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


export default function CTASection() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center  overflow-hidden shadow-2xl  bg-black/60">
      {/* Background Overlay Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1920&auto=format&fit=crop"
          alt="Dream Home"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-6 md:px-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Ready to find your next home?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-100">
          Start your search today and move into your dream property with ease.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-all"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
