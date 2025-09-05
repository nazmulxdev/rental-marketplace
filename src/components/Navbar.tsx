"use client";

// Navbar Component (Collaborative Notes)
// -------------------------------------
// PURPOSE:
//   Provides a global site navigation bar for the RentEase platform.
//   Structure: [Logo / Brand] | [Primary Navigation Links] | [Auth & Actions]
//   This component is intentionally kept presentational + lightweight.
//
// TEAM EXTENSION POINTS (search these tags when editing):
//   - AUTH_HOOK: Replace the placeholder auth logic with real auth state (e.g. NextAuth, custom JWT, etc.).
//   - NAV_LINKS: Add/update navigation items (also create corresponding pages under src/app/... ).
//   - THEME_TOGGLE: If you want to place the ThemeToggleButton inside the navbar later.
//
// DESIGN GOALS:
//   - Accessible (semantic <nav>, aria-label, focus styles rely on Tailwind defaults)
//   - Responsive: Stack collapses gracefully on very small widths without JS.
//   - Zero dependency on global.css changes (per requirement not to touch global.css).
//   - Pure client component only because we may later read pathname / auth client state.
//
// NOTES:
//   - The active link is highlighted by comparing the current pathname.
//   - When adding new nav items keep labels short (<= 12 chars ideally) for layout stability.
//   - If you implement a mobile drawer/hamburger later, wrap center links in a disclosure.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";

// (NAV_LINKS) Centralized definition so designers & devs can reorder easily.
const NAV_ITEMS: Array<{ label: string; href: string }> = [
	{ label: "Home", href: "/" },
	{ label: "Listings", href: "/listings" },
	{ label: "About Us", href: "/about" },
];

// Utility: builds classes for nav links; adjust palette/tokens here only.
const linkBaseClasses =
	"px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";
const inactiveClasses = "text-base-content/70 hover:text-base-content hover:bg-base-200";
const activeClasses = "text-primary bg-primary/10 hover:bg-primary/20";

// (AUTH_HOOK) Lightweight session fetcher for NextAuth without adding client dependency.
// Avoids editing other files (package.json) per request. If you later install next-auth
// client package, you can replace this with `useSession()` from "next-auth/react".
function useSessionLite() {
	const [state, setState] = useState<{
		loading: boolean;
		user: { name?: string | null; email?: string | null; image?: string | null } | null;
	}>({ loading: true, user: null });

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch("/api/auth/session", { cache: "no-store" });
				if (!res.ok) throw new Error("session request failed");
				const data = await res.json();
				if (!cancelled) {
					setState({ loading: false, user: data?.user ?? null });
				}
			} catch {
				if (!cancelled) setState({ loading: false, user: null });
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	return {
		loading: state.loading,
		isAuthenticated: !!state.user,
		user: state.user,
	};
}

const Navbar = () => {
	const pathname = usePathname();
	const auth = useSessionLite(); // (AUTH_HOOK) Replace with useSession() when next-auth client added.

	// Sign-out logic using NextAuth endpoints manually (POST with CSRF flow simplified).
	const [signingOut, setSigningOut] = useState(false);
	const handleSignOut = useCallback(async () => {
		try {
			setSigningOut(true);
			// Get CSRF token
			const csrfRes = await fetch("/api/auth/csrf", { cache: "no-store" });
			const csrfData = await csrfRes.json();
			const form = new URLSearchParams();
			form.set("csrfToken", csrfData.csrfToken);
			await fetch("/api/auth/signout", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: form.toString(),
			});
			// Refresh to reflect logged-out UI.
			window.location.href = "/";
		} catch {
			setSigningOut(false);
		}
	}, []);

	// (STATE) Mobile menu open/closed.
	const [open, setOpen] = useState(false);

	// Close menu on route change (so when user navigates, panel hides automatically).
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const toggle = useCallback(() => setOpen((o) => !o), []);

	// Compute nav items with active flag only when pathname changes.
	const items = useMemo(
		() =>
			NAV_ITEMS.map((item) => ({
				...item,
				active: item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href),
			})),
		[pathname]
	);

	return (
		<header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60">
			{/* Outer max-width container */}
			<div className="mx-auto flex h-16 max-w-11/12 items-center gap-6 px-4 sm:px-6 lg:px-8">
				{/* LEFT: Logo / Brand */}
				<div className="flex items-center gap-2 shrink-0">
					<Link href="/" className="flex items-center gap-2 group">
						{/* If a custom logo asset is added later, replace next.svg below (public/rentease-logo.svg) */}
						<Image
							src="/next.svg"
							alt="RentEase logo"
							width={32}
							height={32}
							className="dark:invert transition-transform group-hover:scale-105"
							priority
						/>
						<span className="font-semibold text-lg tracking-tight">RentEase</span>
					</Link>
				</div>

				{/* MOBILE: Hamburger button (hidden >= md) */}
				<div className="flex md:hidden ml-auto items-center">
					<button
						onClick={toggle}
						className="btn btn-ghost btn-sm px-2"
						aria-label="Toggle navigation menu"
						aria-expanded={open}
						aria-controls="mobile-nav-panel"
					>
						{/* Simple icon (3 bars / X) using pure spans to avoid extra deps */}
						<span className="relative block h-4 w-5">
							<span
								className={`absolute left-0 top-0 h-0.5 w-full rounded bg-current transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`}
							/>
							<span
								className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
							/>
							<span
								className={`absolute left-0 top-3 h-0.5 w-full rounded bg-current transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
							/>
						</span>
					</button>
				</div>

				{/* CENTER: Primary navigation (desktop) (NAV_LINKS) */}
				<nav aria-label="Primary" className="hidden md:flex flex-1 justify-center">
					<ul className="flex items-center gap-1 md:gap-2">
						{items.map(({ href, label, active }) => (
							<li key={href}>
								<Link
									href={href}
									className={`${linkBaseClasses} ${active ? activeClasses : inactiveClasses}`}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* RIGHT: Auth / Actions (desktop) */}
				<div className="hidden md:flex items-center gap-3">
					{/* (THEME_TOGGLE) Optionally place <ThemeToggleButton /> here later. */}
					{auth.loading ? (
						<span className="loading loading-spinner loading-sm" aria-label="Loading session" />
					) : auth.isAuthenticated && auth.user ? (
						<AvatarDropdown user={auth.user} onSignOut={handleSignOut} signingOut={signingOut} />
					) : (
						<Link href="/login" className="btn btn-sm md:btn-md btn-primary">
							Login
						</Link>
					)}
				</div>

				{/* MOBILE: Auth button stays visible on right if we want both icon + login (optional). */}
				{!auth.loading && !auth.isAuthenticated && (
					<div className="md:hidden ml-2">
						<Link href="/login" className="btn btn-xs sm:btn-sm btn-primary">
							Login
						</Link>
					</div>
				)}
				{!auth.loading && auth.isAuthenticated && auth.user && (
					<div className="md:hidden ml-2">
						<AvatarDropdown mobile user={auth.user} onSignOut={handleSignOut} signingOut={signingOut} />
					</div>
				)}
			</div>

			{/* MOBILE COLLAPSIBLE PANEL (slides down) */}
			<div
				id="mobile-nav-panel"
				className={`md:hidden overflow-hidden border-t border-base-300 bg-base-100 transition-[max-height,opacity] duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
				aria-hidden={!open}
			>
				<ul className="flex flex-col px-4 py-3 gap-1">
					{items.map(({ href, label, active }) => (
						<li key={href}>
							<Link
								href={href}
								className={`w-full block ${linkBaseClasses} ${active ? activeClasses : inactiveClasses}`}
							>
								{label}
							</Link>
						</li>
					))}
					{/* (OPTIONAL) Move auth action inside menu instead of top-right: comment out above small-screen auth if using this. */}
					{auth.isAuthenticated ? (
						<li className="pt-2 border-t border-base-300 mt-1">
							<Link href="/dashboard" className="btn btn-sm w-full btn-outline">
								Dashboard
							</Link>
						</li>
					) : null}
				</ul>
			</div>
		</header>
	);
};

export default Navbar;

// AvatarDropdown (inline component)
// ---------------------------------
// Provides an accessible dropdown for user actions without altering other files.
// On mobile, renders a simplified horizontal layout instead of floating menu.
interface AvatarDropdownProps {
	user: { name?: string | null; email?: string | null; image?: string | null };
	onSignOut: () => void;
	signingOut: boolean;
	mobile?: boolean;
}

const AvatarDropdown = ({ user, onSignOut, signingOut, mobile }: AvatarDropdownProps) => {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => setOpen((o) => !o), []);
	const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

	if (mobile) {
		return (
			<div className="flex items-center gap-2">
				<button
					onClick={() => (window.location.href = "/dashboard")}
					className="flex items-center"
					aria-label="Go to dashboard"
				>
					{user.image ? (
						<Image
							src={user.image}
							alt={user.name || "User avatar"}
							width={30}
							height={30}
							className="rounded-full border border-base-300"
						/>
					) : (
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-medium border border-base-300">
							{initial}
						</span>
					)}
				</button>
				<button
					onClick={onSignOut}
					className="btn btn-xs sm:btn-sm btn-outline"
					disabled={signingOut}
				>
					{signingOut ? <span className="loading loading-spinner loading-xs" /> : "Logout"}
				</button>
			</div>
		);
	}

	return (
		<div className="relative">
			<button
				onClick={toggle}
				className="flex items-center gap-2 focus:outline-none"
				aria-haspopup="menu"
				aria-expanded={open}
			>
				{user.image ? (
					<Image
						src={user.image}
						alt={user.name || "User avatar"}
						width={36}
						height={36}
						className="rounded-full border border-base-300"
					/>
				) : (
					<span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary font-medium border border-base-300">
						{initial}
					</span>
				)}
			</button>
			{open && (
				<div
					role="menu"
					className="absolute right-0 mt-2 w-52 rounded-md border border-base-300 bg-base-100 shadow-lg p-2 z-50"
				>
					<div className="px-2 py-2 text-xs text-base-content/60">
						<span className="block font-medium text-base-content/80 truncate">
							{user.name || user.email}
						</span>
						{user.email && user.name && (
							<span className="block truncate">{user.email}</span>
						)}
					</div>
					<ul className="menu menu-sm">
						<li>
							<button onClick={() => (window.location.href = "/dashboard")}>Dashboard</button>
						</li>
						<li>
							<button onClick={() => (window.location.href = "/dashboard/profile")}>Profile</button>
						</li>
						<li>
							<button onClick={() => (window.location.href = "/dashboard/settings")}>Settings</button>
						</li>
						<li className="pt-1 mt-1 border-t border-base-300">
							<button onClick={onSignOut} disabled={signingOut} className="text-error">
								{signingOut ? (
									<span className="loading loading-spinner loading-xs" />
								) : (
									"Logout"
								)}
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

