"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import MemberRequest from "./MemberRequest";
import AdminRequest from "./AdminRequest";

const AdminTab = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const { data: session } = useSession();
  const superAdminId = session?.user?.id || "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Super Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Admin Requests
        </button>
        <button
          onClick={() => setActiveTab("member")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "member" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Member Requests
        </button>
      </div>

      {activeTab === "admin" ? <AdminRequest superAdminId={superAdminId} /> : <MemberRequest />}
    </div>
  );
};

export default AdminTab;
