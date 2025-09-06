// src/app/not-found.jsx
"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 px-4">
      <h1 className="text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 animate-bounce">
        404
      </h1>
      <div className="text-6xl mb-4 animate-pulse">🏠💨</div>
      <h2 className="text-3xl font-semibold text-gray-700 mb-2 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}
