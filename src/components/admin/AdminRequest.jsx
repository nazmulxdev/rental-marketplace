"use client";

import React, { useEffect, useState } from "react";

const AdminRequest = ({ superAdminId }) => {
  const [adminRequests, setAdminRequests] = useState([]);

  useEffect(() => {
    fetchAdminRequests();
  }, []);

  async function fetchAdminRequests() {
    try {
      const res = await fetch("/api/admin/admin-request");
      const data = await res.json();
      setAdminRequests(data.requests || []);
    } catch (err) {
      console.error(err);
      setAdminRequests([]);
    }
  }

  async function handleAdminAction(id, action) {
    try {
      const res = await fetch(`/api/admin/admin-request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, superAdminId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update admin request");

      setAdminRequests((prev) =>
        prev.map((r) =>
          r._id === id
            ? {
                ...r,
                status:
                  action === "approve"
                    ? "approved"
                    : action === "reject"
                    ? "rejected"
                    : action === "member"
                    ? "member"
                    : "banned",
              }
            : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  const getBadgeClass = (status) => {
    switch (status) {
      case "pending":
      case "MEMBER":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
      case "ADMIN":
        return "bg-green-100 text-green-700";
      case "banned":
      case "BANNED":
        return "bg-red-100 text-red-700";
      case "member":
      case "MEMBER":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {adminRequests.length === 0 && <p className="text-gray-500">No admin requests</p>}
      {adminRequests.map((req) => (
        <div key={req._id} className="p-4 border rounded-lg flex justify-between items-center">
          <div>
            <p><strong>User ID:</strong> {req.userId}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-2 py-1 rounded text-sm ${getBadgeClass(req.status)}`}>
                {req.status}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            {req.status === "pending" && (
              <>
                <button
                  onClick={() => handleAdminAction(req._id.toString(), "approve")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAdminAction(req._id.toString(), "reject")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </>
            )}

            {req.status === "approved" && (
              <>
                <button
                  onClick={() => handleAdminAction(req._id.toString(), "member")}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Make Member
                </button>
                <button
                  onClick={() => handleAdminAction(req._id.toString(), "ban")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Ban
                </button>
              </>
            )}

            {req.status === "banned" && (
              <button
                onClick={() => handleAdminAction(req._id.toString(), "member")}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Make Member
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminRequest;
