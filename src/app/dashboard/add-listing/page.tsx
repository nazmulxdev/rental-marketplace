import React from "react";
import AddListingForm from "@/components/dashboard/AddListingForm";

export default function AddListingPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Add Listing</h1>
        <p className="text-sm text-base-content/70 max-w-2xl">Provide clear and concise details. You can enhance the listing later with images, amenities and rules.</p>
      </div>
      <AddListingForm />
    </section>
  );
}
