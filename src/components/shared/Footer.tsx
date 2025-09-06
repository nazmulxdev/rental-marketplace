"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-16 pb-8 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white">🏡 RentEase</h2>
          <p className="mt-4 text-gray-400">
            Find your dream home with ease. Secure payments, verified listings,
            and AI-powered search to make renting smarter.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Properties</a></li>
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <p className="text-gray-400">📍 Banani, Dhaka, Bangladesh</p>
          <p className="text-gray-400">📞 +880 123 456 789</p>
          <p className="text-gray-400">✉️ support@rentease.com</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 transition">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-sky-500 transition">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-pink-500 transition">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} RentEase. All rights reserved.
      </div>
    </footer>
  );
}
