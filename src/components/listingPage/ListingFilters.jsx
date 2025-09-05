"use client";
import { useState } from "react";

//onFilter only when filtering handled by front end
//setListings as props instead onFilter ,if data fetch from backend
const ListingFilters = ({ onFilter }) => {

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    priceRange: "",
    propertyType: "",
  });

  //If listings data fetched from backend
  // const [listings, setListings] = useState([])

  // Handle the onChange value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle apply filters will use the function from ListingCards comonent function, and the filters parameter will give access for the filters data on ListingCards component
  const handleApplyFilters = () => {
    // Remove this if you are filtering with backend
    onFilter(filters);

    // 🔗 BACKEND INTEGRATION (later)
    // fetch(`/api/listings?search=${filters.search}&location=${filters.location}&price=${filters.priceRange}&type=${filters.propertyType}`)
    //   .then(res => res.json())
    //   .then(data => setListings(data));
  };

  return (
    <div className="w-full rounded-lg grid md:grid-cols-4 gap-4">
      {/* Search */}
      <input
        type="text"
        name="search"
        placeholder="Search by title, area..."
        value={filters.search}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />

      {/* Location */}
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={filters.location}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />

      {/* Price Range */}
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

      {/* Property Type */}
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

      {/* Apply Button */}
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
