"use client";
import { useState } from "react";

const ListingFilters = ({ onApply }) => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    priceRange: "",
    propertyType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onApply(filters); // Pass filters to parent
  };

  return (
    <div className="w-full rounded-lg grid md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        name="search"
        placeholder="Search by title, area..."
        value={filters.search}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={filters.location}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />
      <select
        name="priceRange"
        value={filters.priceRange}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">Any Price</option>
        <option value="0-5000">৳0 - ৳5000</option>
        <option value="5000-10000">৳5000 - ৳10000</option>
        <option value="10000-20000">৳10000 - ৳20000</option>
        <option value="20000+">৳20000+</option>
      </select>
      <select
        name="propertyType"
        value={filters.propertyType}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">All Types</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="room">Room</option>
        <option value="office">Office</option>
      </select>
      <div className="md:col-span-4 flex justify-end">
        <button
          onClick={handleApplyFilters}
          className="btn btn-primary rounded w-full md:w-auto"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ListingFilters;
