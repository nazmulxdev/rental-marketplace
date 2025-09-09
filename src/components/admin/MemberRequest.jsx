"use client";

import React, { useEffect, useState } from "react";

const MemberRequest = () => {
  const [memberRequests, setMemberRequests] = useState([]);

  useEffect(() => {
    fetchMemberRequests();
  }, []);

  async function fetchMemberRequests() {
    try {
      const res = await fetch("/api/admin/member-request");
      const data = await res.json();
      setMemberRequests(data.memberRequests || []);
    } catch (err) {
      console.error(err);
      setMemberRequests([]);
    }
  }

  async function handleMemberAction(id, action) {
    try {
      const res = await fetch(`/api/admin/member-request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update member request");

      // Update UI without removing the user
      setMemberRequests((prev) =>
        prev.map((r) =>
          r._id === id
            ? { ...r, profile: { ...r.profile, roleRequest: action === "approve" ? "APPROVED" : "REJECTED" } }
            : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-4">
      {memberRequests.length === 0 && <p className="text-gray-500">No member requests</p>}
      {memberRequests.map((req) => (
        <div key={req._id} className="p-4 border rounded-lg flex justify-between items-center">
          <div>
            <p><strong>Email:</strong> {req.email}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  req.profile.roleRequest === "MEMBER"
                    ? "bg-yellow-100 text-yellow-700"
                    : req.profile.roleRequest === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {req.profile.roleRequest}
              </span>
            </p>
          </div>

          {/* Only show buttons for pending members */}
          {req.profile.roleRequest === "MEMBER" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleMemberAction(req._id, "approve")}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleMemberAction(req._id, "reject")}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberRequest;
