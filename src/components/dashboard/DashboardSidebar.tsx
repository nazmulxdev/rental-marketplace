"use client";

import { useSession } from "next-auth/react";
// DashboardSidebar (Client Component)
// -----------------------------------
// Renders navigational links for dashboard routes with active state highlighting.
// Add / remove links by editing DASH_LINKS below. Keep labels concise.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { FiHome, FiPlusCircle, FiMessageCircle, FiSettings, FiUser, FiFolder } from "react-icons/fi";
type Role = "SUPER_ADMIN" | "ADMIN" | "MEMBER" | "USER";

interface DashLink {
  label: string;
  href: string;
  icon: IconType;
  roles: Role[]
}

const DASH_LINKS: DashLink[] = [
  { label: "Overview", href: "/dashboard", icon: FiHome, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER", "USER"] },
  { label: "My Listings", href: "/dashboard/my-listings", icon: FiFolder, roles: ["SUPER_ADMIN", "ADMIN", "MEMBER"] },
  { label: "Add Listing", href: "/dashboard/add-listing", icon: FiPlusCircle, roles: ["SUPER_ADMIN","ADMIN"] },
  { label: "Messages", href: "/dashboard/messages", icon: FiMessageCircle, roles: ["MEMBER", "ADMIN", "SUPER_ADMIN"] },
  { label: "Profile", href: "/dashboard/profile", icon: FiUser, roles: ["USER", "ADMIN", "MEMBER", "SUPER_ADMIN"] },
  { label: "Settings", href: "/dashboard/settings", icon: FiSettings, roles: ["SUPER_ADMIN","ADMIN"] },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
const role = session?.user?.role || "USER";

  const items = useMemo(() =>
    DASH_LINKS
      .filter((l) => l.roles.includes(role)) // only allowed for current role
      .map((l) => ({
        ...l,
        active: l.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(l.href),
      })),
    [pathname, role]
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
