"use client";

// DashboardSidebar (Client Component)
// -----------------------------------
// Renders navigational links for dashboard routes with active state highlighting.
// Add / remove links by editing DASH_LINKS below. Keep labels concise.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { FiHome, FiPlusCircle, FiMessageCircle, FiSettings, FiUser, FiFolder } from "react-icons/fi";

interface DashLink {
  label: string;
  href: string;
  icon: IconType;
}

const DASH_LINKS: DashLink[] = [
  { label: "Overview", href: "/dashboard", icon: FiHome },
  { label: "My Listings", href: "/dashboard/my-listings", icon: FiFolder },
  { label: "Add Listing", href: "/dashboard/add-listing", icon: FiPlusCircle },
  { label: "Messages", href: "/dashboard/messages", icon: FiMessageCircle },
  { label: "Profile", href: "/dashboard/profile", icon: FiUser },
  { label: "Settings", href: "/dashboard/settings", icon: FiSettings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const items = useMemo(
    () =>
      DASH_LINKS.map((l) => ({
        ...l,
        active: l.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(l.href),
      })),
    [pathname]
  );

  return (
    <nav aria-label="Dashboard navigation" className="space-y-4">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-2">
          Navigation
        </h2>
        <ul className="flex flex-col gap-1">
          {items.map(({ href, label, icon: Icon, active }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors border border-transparent ${
                  active
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
