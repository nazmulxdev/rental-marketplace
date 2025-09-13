"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Typewriter from "typewriter-effect";
import { getTheFeaturedProduct } from "./action/featuredProperties";

export type PropertyType = "room" | "apartment" | "house";
export type AvailabilityStatus = "vacant" | "occupied";
export type PropertyStatus = "active" | "draft" | "archived";

export interface Property {
  _id: string; // MongoDB ObjectId as string
  ownerAdminId: string; // admin_profiles.userId
  title: string;
  description: string;
  type: PropertyType;
  pricing: {
    monthly: number;
    deposit: number;
  };
  amenities: string[];
  rules: string[];
  location: {
    geo: {
      type: "Point";
      coordinates: [number, number]; // [lng, lat]
    };
    address: {
      city: string;
      district: string;
      division: string;
    };
  };
  images: {
    url: string;
    provider: string;
  }[];
  availability: AvailabilityStatus;
  status: PropertyStatus;
  stats: {
    saves: number;
    views: number;
  };
  createdAt: string; // use Date if you convert properly in frontend
  updatedAt: string;
  deletedAt?: string; // optional
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/properties/featured");
        const data = await res.json();
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          <Typewriter
            options={{
              strings: [
                "Featured Properties",
                "Find Your Dream Home",
                "Luxury Living Made Easy",
              ],
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
                src={property?.images[0]?.url}
                alt={property.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>

              <div className="absolute bottom-4 left-4 text-white">
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

              <button className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-yellow-400 text-white py-2 text-center font-medium">
                View Details
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
