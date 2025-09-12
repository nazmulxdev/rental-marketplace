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
      // Only show pending requests
      const pendingRequests = (data.requests || []).filter((r) => r.status === "pending");
      setAdminRequests(pendingRequests);
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

      // Remove the request from the UI after approval or rejection
      setAdminRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-4">
      {adminRequests.length === 0 && <p className="text-gray-500">No pending admin requests</p>}
      {adminRequests.map((req) => (
        <div key={req._id} className="p-4 border rounded-lg flex justify-between items-center">
          <div>
            <p><strong>User ID:</strong> {req.userId}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-700">
                {req.status}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminRequest;
