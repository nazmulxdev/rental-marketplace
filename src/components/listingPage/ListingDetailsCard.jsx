"use client";
import React, { useEffect, useState } from 'react';
import StripePaymentForm from './PaymentForm';
import { useSession } from 'next-auth/react';
import { isBooked } from './action/payment';

const ListingDetailsCard = ({ listing }) => {
  const { data: session } = useSession();   // ✅ de-structure session
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Update email when session changes
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  // ✅ Check booking when email + listing._id are ready
  useEffect(() => {
    const checkBooked = async () => {
      if (email && listing._id) {
        const res = await isBooked(email, listing._id);
        console.log("isBooked:", res);
        if (res) {
          setDisable(true);
        }
      }
    };
    checkBooked();
  }, [email, listing._id]);

  const handlePayment = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
      <p className="text-gray-600 mb-4">
        {listing.type} • {listing.location?.address?.city || "Unknown City"}
      </p>

      {/* Image */}
      <div className="mb-6">
        {listing.images?.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-lg">
            No Image
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          ৳{listing.pricing?.monthly || "N/A"}
        </span>
        <span className="text-gray-500 ml-2">/month</span>
        <p className="text-gray-600">Deposit: ৳{listing.pricing?.deposit || "N/A"}</p>
      </div>

      {/* Description */}
      <p className="text-gray-800 leading-relaxed mb-6">
        {listing.description || "No description available."}
      </p>

      {/* Availability */}
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold ${
          listing.availability === "vacant"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {listing.availability}
      </span>

      {/* Stats */}
      <div className="mt-6 text-sm text-gray-500">
        <p>💾 Saves: {listing.stats?.saves || 0}</p>
        <p>👀 Views: {listing.stats?.views || 0}</p>
        <p>📅 Posted on {new Date(listing.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Button */}
      <button
        onClick={() => handlePayment(listing._id)}
        disabled={disable}
        className="btn btn-primary btn-wide my-3"
      >
        {isOpen
          ? `Pay ৳ ${listing.pricing?.monthly} for booking`
          : "Book Now"}
      </button>

      {/* Payment form */}
      <div className="mx-auto">
        {isOpen && <StripePaymentForm listing={listing} />}
      </div>
    </div>
  );
};

export default ListingDetailsCard;
