"use client";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900 rounded-tl-2xl border border-gray-300">
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-white border border-gray-300 shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Total Reports</h3>
          <p className="text-2xl text-gray-700">42</p>
        </div>
        <div className="p-6 rounded-lg bg-white border border-gray-300 shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Recent Activity</h3>
          <p className="text-2xl text-gray-700">5</p>
        </div>
        <div className="p-6 rounded-lg bg-white border border-gray-300 shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Profile Status</h3>
          <p className="text-2xl text-gray-700">Active</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/dashboard/generate" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </a>
          <a href="/dashboard/recents" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            View Recents
          </a>
          <a href="/dashboard/profile" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
}