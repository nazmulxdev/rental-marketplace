"use client";
import { useState, useEffect } from "react";
import ListingFilters from "./ListingFilters";
import Link from "next/link";

export default function ListingCards() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(listings)

  // Fetch listings from backend
  const fetchListings = async (filters = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/listings?${query}`);
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="space-y-6">
      <ListingFilters onApply={fetchListings} />

      <div className="grid md:grid-cols-3 gap-6">
  {loading ? (
    <p className="text-center col-span-full text-gray-500">Loading listings...</p>
  ) : listings.length === 0 ? (
    <p className="text-center col-span-full text-gray-500">No rentals found for now.</p>
  ) : (
    listings.map((item) => (
      <div
  key={item._id}
  className="bg-base-100 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 border border-gray-500"
>
  {/* Image */}
  <div className="relative w-full h-56">
    {item.images?.length > 0 ? (
      <img
        src={item.images[0]}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <span className="font-medium text-gray-500">No Image</span>
      </div>
    )}

    {/* Availability badge */}
    <span
      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
        item.availability === "vacant" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {item.availability.toUpperCase()}
    </span>
  </div>

  {/* Content */}
  <div className="p-4 flex flex-col flex-1">
    <h2 className="text-xl font-bold mb-1">{item.title}</h2>
    <p className="text-sm mb-2">
      {item.type} • {item.location?.address?.city || "Unknown City"}
    </p>
    <p className="text-sm mb-4 line-clamp-3">
      {item.description || "No description available."}
    </p>
    <div className="mb-4">
      <span className="text-lg font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        ৳{item.pricing?.monthly || "N/A"}
      </span>
      <span className="text-gray-500 text-sm ml-2">/month</span>
    </div>

    {/* View Details Button */}
    <button 
      className="mb-4 inline-block text-center py-2 px-4 rounded-full btn btn-primary"
    >
      <Link href={`/listings/${item._id}`}>
      View Details
      </Link>
    </button>

    {/* Stats */}
    <div className="flex justify-between text-xs text-gray-400 mt-auto">
      <span>💾 {item.stats?.saves || 0}</span>
      <span>👀 {item.stats?.views || 0}</span>
      <span>📅 {new Date(item.createdAt).toLocaleDateString()}</span>
    </div>
  </div>
</div>

    ))
  )}
</div>

    </div>
  );
}
