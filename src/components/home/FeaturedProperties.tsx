"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Typewriter from "typewriter-effect";
import { getTheFeaturedProduct } from "./action/featuredProperties";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);



useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getTheFeaturedProduct();
      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };
  
  fetchData();
}, []);

  // Framer motion settings
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl md:text-4xl font-bold  text-center mb-12">
      <Typewriter
        options={{
          strings: ["Featured Properties", "Find Your Dream Home", "Luxury Living Made Easy"],
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 30,
        }}
      />
    </h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property._id}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden shadow-lg group"
            >
              <img
                src={property.images[0]?.url}
                alt={property.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 transition-all"></div>

              <div className="absolute bottom-4 left-4 ">
                <h3 className="text-xl font-semibold">{property.title}</h3>
                <p className="text-sm">
                  {property.location.address.district},{" "}
                  {property.location.address.city}
                </p>
                <p className="mt-2 text-lg font-bold">
                  ৳ {property.pricing.monthly.toLocaleString()}/month
                </p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm">4.5</span>
                </div>
              </div>

              <button className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-green-600 py-2 text-center font-medium text-primary-content">
                View Details
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
