// components/StripePaymentForm.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { FaRegCreditCard, FaUser, FaEnvelope } from "react-icons/fa";
import { getTheIntent, isBooked, saveThePaymentHistory } from "./action/payment";
import { Currency } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Card element custom style
const CARD_OPTIONS = {
  style: {
    base: {
      color: "#111827",
      fontFamily:
        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#9CA3AF",
      },
      iconColor: "#6B7280",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
};

function CheckoutForm({ listing }) {
  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState(session?.data?.user?.name || "");
  const [email, setEmail] = useState(session?.data?.user?.email || "");
  const userId = session?.data?.user?.id;
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [booked, setBooked] = useState(false);
  const amount=listing.pricing?.monthly;
  console.log(listing)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      return;
    }

    setProcessing(true);

    try {
      // Call backend API to create PaymentIntent
      const res = await getTheIntent(amount);
      console.log(res);
      const { clientSecret } = res;

      if (!clientSecret) throw new Error("No client secret returned.");

      const cardElement = elements.getElement(CardElement);

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { name, email },
          },
        });

      if (confirmError) {
        setError(confirmError.message || "Payment failed");
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
  setSuccess("✅ Payment succeeded! Thank you.");
  setBooked(true);

  // save payment history
  /* _id: ObjectId,
  type: 'onboarding_fee' | 'rent' | 'deposit' | 'refund' | 'payout',
  payerUserId: ObjectId,          // who paid
  payeeUserId: ObjectId,          // who received
  agreementId: ObjectId,          // optional -> agreements
  applicationId: ObjectId,        // optional -> admin_applications
  amount: Number,                 // in smallest unit
  currency: 'BDT' | 'USD',
  status: 'pending' | 'paid' | 'failed' | 'refunded',
  transactionId: String,          // from gateway (Stripe/SSLCommerz/etc.)
  paymentMethod: 'stripe' | 'bkash' | 'nagad' | 'bank',
  paymentAt: Date,                // actual confirmation time
  meta: Object,                   // raw response from gateway
  createdAt: Date,
  updatedAt: Date
  */
  const data = {
    payment_username: name,
    type: 'rent',
    payerUserId: userId,
    payeeUserId: listing?.ownerAdminId,
    payment_useremail: email,
    propertiesId: listing._id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    transactionId: paymentIntent.id,
    payment_method: paymentIntent.payment_method,
    paymentAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await saveThePaymentHistory(data);

  // ✅ create booking entry
  await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: session?.data?.user?.id,          // seeker
      adminUserId: listing.ownerAdminId,         // landlord
      propertyId: listing._id,
      slot: { start: new Date(), end: null, timezone: "Asia/Dhaka" },
      notes: "Initial booking after payment",
    }),
  });
} else {
        setError("Payment not completed. Status: " + paymentIntent?.status);
      }
    } catch (err) {
      setError(err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className=" w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-amber-500"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Secure Payment
          </h3>
          <p className="text-sm text-gray-500">Pay securely with your card</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Amount</div>
          <div className="text-xl font-bold text-indigo-700">
            ৳ {(amount).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Virtual Credit Card Preview */}
      <div className="relative w-full h-56 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 shadow-lg mb-6 p-6 text-white flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <FaRegCreditCard className="text-3xl opacity-80" />
          <span className="text-sm tracking-wider">VIRTUAL CARD</span>
        </div>
        <div className="text-lg tracking-widest font-mono">
          **** **** **** 4242
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-70">Card Holder</div>
            <div className="font-semibold">{name || "FULL NAME"}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">Expires</div>
            <div className="font-semibold">MM/YY</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaUser className="inline mr-2 text-gray-500" />
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaEnvelope className="inline mr-2 text-gray-500" />
            Email
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Stripe Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 shadow-inner">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </div>

        {/* Error / Success */}
        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && <div className="text-sm text-green-600">{success}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-3 rounded-xl shadow hover:shadow-2xl transform transition active:scale-[0.99]"
        >
          {processing
            ? "Processing..."
            : `Pay ৳ ${(amount).toLocaleString()}`}
        </button>
      </form>
    </motion.div>
  );
}

export default function StripePaymentForm({listing}) {
  return (
    <Elements stripe={stripePromise}>
      <div className=" flex items-center justify-center p-6">
        <CheckoutForm listing={listing} />
      </div>
    </Elements>
  );
}
