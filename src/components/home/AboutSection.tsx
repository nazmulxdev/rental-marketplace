"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://i.ibb.co.com/0RTKv1qH/curae7le878c73aaqgvg-webp-image.png"
            alt="About RentEase"
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-purple-600">RentEase</span>
          </h2>
          <p className="text-lg text-card-text leading-relaxed mb-6">
            RentEase is more than just a rental platform. We connect tenants
            with verified landlords, making the rental process safe, transparent,
            and stress-free. Our mission is to help you find your dream home
            with just a few clicks.
          </p>
          <p className="text-lg text-card-text leading-relaxed">
            With AI-powered smart search, secure payments, and real-time chat,
            we’re redefining the future of property rentals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
