"use client";
import React from "react";

export default function RecentsPage() {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Recent Reports
      </h1>
      <div className="flex flex-col gap-4">
        {/* Placeholder for recent reports */}
        <div className="p-4 border rounded-lg bg-white shadow">
          <h3 className="font-medium">Report 1</h3>
          <p className="text-sm text-gray-600">Generated on: 2023-10-01</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <h3 className="font-medium">Report 2</h3>
          <p className="text-sm text-gray-600">Generated on: 2023-09-28</p>
        </div>
        {/* Add more as needed */}
      </div>
    </div>
  );
}
