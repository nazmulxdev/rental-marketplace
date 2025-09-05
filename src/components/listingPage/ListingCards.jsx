"use client";
import { useState } from "react";
import ListingFilters from "./ListingFilters";

//Remove listings props if data handle from backend
export default function ListingCards({ listings }) {
    // filtered will store the listing data initially (Frontend only)
  const [filtered, setFiltered] = useState(listings);

  // If data fetched from backend
  // const [listings, setListings] = useState([]);

  // Funtion for filtering
  const handleFilter = (filters) => {
    // Initially the result has  all listings data
    let result = listings;

    // FRONTEND filtering for now
    if (filters.search) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.location) {
      result = result.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.includes("+")
        ? [20000, Infinity]
        : filters.priceRange.split("-").map(Number);
      result = result.filter((item) => item.price >= min && item.price <= max);
    }
    if (filters.propertyType) {
      result = result.filter((item) => item.type === filters.propertyType);
    }

    setFiltered(result);

  };

  return (
    <div className="space-y-6">
        {/* Filter function sent as props to listing filters component, it will get a parameter from there */}
        {/* HandleFilter sent only when you trying to filter on frontend */}
        {/* setListings sent when data fetch from backend */}

      <ListingFilters onFilter={handleFilter}
    //   setListings={setListings}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {/* map with listings if data fetch from backend */}
        {filtered.map((item) => (
          <div key={item.id} className="border rounded-lg shadow p-4">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p>{item.location}</p>
            <p>৳{item.price}</p>
            <p>{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
