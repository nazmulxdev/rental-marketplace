import ListingCards from "@/components/listingPage/ListingCards";

export default function ListingsPage() {
  return (
    <div className="mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Available Rentals</h1>
      <ListingCards />
    </div>
  );
}
