// Dashboard Overview Page (Server Component)
// -----------------------------------------
// Initial placeholder. Replace with real stats, recent messages, listings summary.
// Future: fetch user-specific data (listings, unread messages, upcoming visits).
import React from "react";

export default async function DashboardOverviewPage() {
  // (DATA_FETCH) Later: fetch data from server/database here.
  return (
    <section className="space-y-6">
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">Overview</h2>
          <p className="text-base-content/70 text-sm">
            Welcome to your dashboard. This placeholder will evolve to show quick stats
            like total listings, active chats, pending requests, and recent activity.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Listings", "Messages", "Visits"].map((label) => (
          <div key={label} className="card bg-base-100 border border-base-300">
            <div className="card-body py-5">
              <h3 className="font-medium">{label}</h3>
              <p className="text-base-content/60 text-sm">No data yet.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
