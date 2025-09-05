import ListingCards from "@/components/listingPage/ListingCards";


export default async function ListingsPage() {
  // ✅ For now, mock static data
  const listings = [
    { id: 1, title: "2BHK in Dhaka", location: "Dhaka", price: 8000, type: "apartment" },
    { id: 2, title: "Room in Chittagong", location: "Chittagong", price: 4000, type: "room" },
    { id: 3, title: "House in Sylhet", location: "Sylhet", price: 15000, type: "house" },
  ];


  return (
    <div className="mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 lg:px-8">
        {/* Listings data sent as props to listing cards component, only when data get from front end */}
      <h1 className="text-2xl font-bold mb-6">Available Rentals</h1>
      <ListingCards listings={listings} />
    </div>
  );
}
