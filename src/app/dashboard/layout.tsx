// Dashboard Layout (Server Component)
// ----------------------------------
// Provides a structural shell with a left sidebar for all /dashboard routes.
// Sidebar links managed via <DashboardSidebar /> client component for active state.
// Extend with role-based filtering, collapsible sections, etc.

import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

export const metadata = { title: "Dashboard | RentEase" };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      {/* Outer constrained container */}
      <div className="mx-auto max-w-11/12 sm:px-6 lg:px-8 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] gap-8">
        {/* LEFT SIDEBAR */}
        <aside
          className="lg:sticky lg:top-20 self-start h-full lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar pr-px"
          aria-label="Dashboard sidebar navigation"
        >
          <DashboardSidebar />
        </aside>
        {/* MAIN CONTENT */}
        <main className="space-y-8 min-w-0" id="dashboard-main" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
