"use client";
import { motion } from "framer-motion";
import { FaLock, FaBolt, FaHome, FaComments } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Secure Payments",
    description: "Pay rent and deposits online with confidence using our encrypted system.",
    icon: <FaLock className="text-4xl text-indigo-500" />,
  },
  {
    id: 2,
    title: "AI-Powered Smart Search",
    description: "Find the perfect property faster with our intelligent AI-driven search.",
    icon: <FaBolt className="text-4xl text-yellow-500" />,
  },
  {
    id: 3,
    title: "Verified Listings",
    description: "All properties are verified to ensure authenticity and avoid fraud.",
    icon: <FaHome className="text-4xl text-green-500" />,
  },
  {
    id: 4,
    title: "Real-Time Chat",
    description: "Instantly connect with landlords and agents for faster decisions.",
    icon: <FaComments className="text-4xl text-pink-500" />,
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Why Choose <span className="text-indigo-600">RentEase</span>?
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group p-6 rounded-2xl shadow-lg bg-base-200 border-2 border-transparent
                         bg-clip-padding hover:border-indigo-500 transition-all duration-300"
            >
              {/* Glow border effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

              {/* Icon */}
              <div className="mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-card-text text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
