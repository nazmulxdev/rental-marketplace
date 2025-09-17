"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Tenant",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    review:
      "RentEase made finding my apartment so easy! The AI search saved me so much time and the landlords were super responsive.",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    role: "Landlord",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.8,
    review:
      "I was able to list my property and get verified tenants within a week. The real-time chat is a game-changer!",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Tenant",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4.9,
    review:
      "The secure payment system gave me peace of mind. Everything felt professional and trustworthy.",
  },
  {
    id: 4,
    name: "Tanvir Hasan",
    role: "Property Manager",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    rating: 5,
    review:
      "Managing multiple properties has never been this smooth. RentEase streamlined everything for me.",
  },
];

export default function Testimonials() {
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
          What Our Users Say
        </motion.h2>

        {/* Testimonials Grid / Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto scrollbar-hide">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group p-6 rounded-2xl shadow-lg bg-base-200 border border-gray-100
                         hover:shadow-2xl hover:border-indigo-400 transition-all duration-300"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-primary">{t.role}</p>
                </div>
              </div>

              {/* Review */}
              <p className="text-card-text text-sm mb-4">{t.review}</p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.round(t.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {t.rating}/5
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
