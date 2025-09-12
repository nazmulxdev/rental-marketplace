"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Typewriter from "typewriter-effect";
import { getTheFeaturedProduct } from "./action/featuredProperties";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);

  // Fake data directly in page
//   useEffect(() => {
// // const fakeData = [
// //   {
// //     _id: "1",
// //     ownerAdminId: "admin1",
// //     title: "Luxury Apartment in Gulshan",
// //     description: "Spacious 3-bedroom apartment with city view.",
// //     type: "apartment",
// //     pricing: { monthly: 75000, deposit: 150000 },
// //     amenities: ["WiFi", "AC", "Parking", "Gym"],
// //     rules: ["No pets", "No smoking indoors"],
// //     location: {
// //       geo: { type: "Point", coordinates: [90.4125, 23.8103] },
// //       address: { city: "Dhaka", district: "Gulshan", division: "Dhaka" },
// //     },
// //     images: [
// //       {
// //         url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&auto=format&fit=crop",
// //         provider: "unsplash",
// //       },
// //     ],
// //     availability: "vacant",
// //     status: "active",
// //     stats: { saves: 120, views: 450 },
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   },
// //   {
// //     _id: "2",
// //     ownerAdminId: "admin2",
// //     title: "Modern Studio in Banani",
// //     description: "Fully furnished studio perfect for singles.",
// //     type: "room",
// //     pricing: { monthly: 35000, deposit: 70000 },
// //     amenities: ["WiFi", "AC", "24/7 Security"],
// //     rules: ["No loud music", "Guests limited"],
// //     location: {
// //       geo: { type: "Point", coordinates: [90.3995, 23.7925] },
// //       address: { city: "Dhaka", district: "Banani", division: "Dhaka" },
// //     },
// //     images: [
// //       {
// //         url: "https://i.ibb.co.com/9HWskH9N/cub0875e878c7387eoo0-webp-image.png",
// //         provider: "unsplash",
// //       },
// //     ],
// //     availability: "vacant",
// //     status: "active",
// //     stats: { saves: 80, views: 310 },
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   },
// //   {
// //     _id: "3",
// //     ownerAdminId: "admin3",
// //     title: "Cozy Family House in Uttara",
// //     description: "5-bedroom spacious house with garden.",
// //     type: "house",
// //     pricing: { monthly: 120000, deposit: 240000 },
// //     amenities: ["Garden", "Parking", "AC", "CCTV"],
// //     rules: ["Pets allowed", "No smoking"],
// //     location: {
// //       geo: { type: "Point", coordinates: [90.3781, 23.8761] },
// //       address: { city: "Dhaka", district: "Uttara", division: "Dhaka" },
// //     },
// //     images: [
// //       {
// //         url: "https://i.ibb.co.com/sdz32Xd4/cv2ifhte878c73bt6j7g-webp-image.png",
// //         provider: "unsplash",
// //       },
// //     ],
// //     availability: "vacant",
// //     status: "active",
// //     stats: { saves: 150, views: 600 },
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   },
// //   {
// //     _id: "4",
// //     ownerAdminId: "admin4",
// //     title: "Budget Apartment in Mirpur",
// //     description: "Affordable 2-bedroom apartment near metro.",
// //     type: "apartment",
// //     pricing: { monthly: 25000, deposit: 50000 },
// //     amenities: ["WiFi", "Parking"],
// //     rules: ["No pets"],
// //     location: {
// //       geo: { type: "Point", coordinates: [90.3667, 23.8223] },
// //       address: { city: "Dhaka", district: "Mirpur", division: "Dhaka" },
// //     },
// //     images: [
// //       {
// //         url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&auto=format&fit=crop",
// //         provider: "unsplash",
// //       },
// //     ],
// //     availability: "vacant",
// //     status: "active",
// //     stats: { saves: 50, views: 210 },
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   },
// //   {
// //     _id: "5",
// //     ownerAdminId: "admin5",
// //     title: "Penthouse with Rooftop in Dhanmondi",
// //     description: "Luxurious penthouse with rooftop lounge.",
// //     type: "apartment",
// //     pricing: { monthly: 180000, deposit: 360000 },
// //     amenities: ["Rooftop", "Gym", "Pool", "Parking"],
// //     rules: ["No smoking indoors"],
// //     location: {
// //       geo: { type: "Point", coordinates: [90.3575, 23.7381] },
// //       address: { city: "Dhaka", district: "Dhanmondi", division: "Dhaka" },
// //     },
// //     images: [
// //       {
// //         url: "https://i.ibb.co.com/dSLVmwR/cva8aale878c73cpt2f0-webp-image.png",
// //         provider: "unsplash",
// //       },
// //     ],
// //     availability: "vacant",
// //     status: "active",
// //     stats: { saves: 200, views: 700 },
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   },
// //   {
// //     _id: "6",
// //     ownerAdminId: "admin6",
// //     title: "Shared Room in Farmgate",
// //     description: "Affordable shared room for students.",
// //     type: "room",
// //     pricing: { monthly: 8000, deposit: 16000 },
// //     amenities: ["WiFi", "Shared Kitchen"],
// //     rules: ["No loud music", "Guests limited"],
// //     location: {
// //       geo: { type: "Point", coordinates: [90.3925, 23.7516] },
// //       address: { city: "Dhaka", district: "Farmgate", division: "Dhaka" },
// //     },
// //     images: [
// //       {
// //         url: "https://i.ibb.co.com/XfRLLy2w/cu93ente878c73btuhvg-webp-image.png",
// //         provider: "unsplash",
// //       },
// //     ],
// //     availability: "vacant",
// //     status: "active",
// //     stats: { saves: 30, views: 120 },
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   },
// // ];

//     const data=await getTheFeaturedProduct();

//     setProperties(data);
//   }, []);

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl md:text-4xl font-bold text-gray-900 text-center mb-12">
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
