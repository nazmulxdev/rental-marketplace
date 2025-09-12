"use client";
import { motion } from "framer-motion";
import { FaSearchLocation, FaComments, FaCalendarCheck } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Search",
    description: "Find properties that match your budget and lifestyle using smart AI filters.",
    icon: <FaSearchLocation className="text-4xl text-indigo-500" />,
  },
  {
    id: 2,
    title: "Connect",
    description: "Chat instantly with landlords or agents, ask questions, and schedule visits.",
    icon: <FaComments className="text-4xl text-indigo-500" />,
  },
  {
    id: 3,
    title: "Book",
    description: "Securely pay deposits or rent online and confirm your booking hassle-free.",
    icon: <FaCalendarCheck className="text-4xl text-indigo-500" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Connector Line */}
          <div className="absolute hidden md:block top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/3"
            >
              {/* Icon */}
              <div className="mb-4 bg-indigo-100 p-4 rounded-full">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
