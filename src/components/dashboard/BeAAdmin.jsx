"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const BeAAdmin = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { data: session } = useSession();
  const role = session?.user.role == "MEMBER";
  console.log(session)
  const handleAdminRegister = async (userId) => {
    const res = await fetch("/api/admin/admin-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message);
    } else {
      setError(data.error);
    }
  };
  if (role) {
    return (
      <div>
        <div className="max-w-md w-full shadow-lg rounded-2xl p-8 text-center h-full">
          {/* Lock Icon */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m-1.5 0h12m-9 4.5h6"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3">Admin Only</h2>

          {/* Subtitle */}
          <p className={``}>
            Only admins can listing property for rentals. Become a admin today
            to unlock exclusive benefits.
          </p>
          {error && <p className="text-red-600 my-2">{error}</p>}
          {success && <p className="text-green-600 my-2">{success}</p>}

          {/* CTA Button */}
          <button
            onClick={() => handleAdminRegister(session?.user?.id)}
            className="w-full py-3 rounded-xl btn btn-secondary font-semibold shadow hover:shadow-md hover:opacity-90 transition my-2"
          >
            Become a Admin
          </button>
        </div>
      </div>
    );
  }
};

export default BeAAdmin;
