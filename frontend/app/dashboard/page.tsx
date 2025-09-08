// app/dashboard/page.tsx
"use client";

import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top-right logo + site name */}
      <div className="w-full flex justify-end items-center px-6 py-3 bg-gray-50">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Metal Craft Logo"
            width={44}
            height={44}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-gray-800">Metal Craft</span>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Metal Craft Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your pollution analysis and insights here.
          </p>
        </div>
      </main>
    </div>
  );
}
