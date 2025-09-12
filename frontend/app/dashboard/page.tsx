"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth-context";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTotalReports = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/report/count`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.flag === "success") {
              setTotalReports(data.count);
            }
          }
        } catch (error) {
          console.error("Error fetching total reports:", error);
        }
      };
      fetchTotalReports();
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900 rounded-tl-2xl border border-gray-200">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your reports.</p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {totalReports}
              </div>
              <div className="text-sm text-gray-500">Total Reports</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Reports</h3>
          <p className="text-gray-600 text-sm">All your generated water quality reports</p>
        </div>

        <div className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                {totalReports}
              </div>
              <div className="text-sm text-gray-500">Recent Activity</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Activity</h3>
          <p className="text-gray-600 text-sm">Your latest report generations</p>
        </div>

        <div className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                Active
              </div>
              <div className="text-sm text-gray-500">Profile Status</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Status</h3>
          <p className="text-gray-600 text-sm">Your account is active and ready</p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="/dashboard/generate" 
            className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Generate Report</h3>
                <p className="text-blue-100 text-sm">Create new water quality analysis</p>
              </div>
            </div>
          </a>

          <a 
            href="/dashboard/recents" 
            className="group p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:from-green-600 hover:to-emerald-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">View Recents</h3>
                <p className="text-green-100 text-sm">Browse your recent reports</p>
              </div>
            </div>
          </a>

          <a 
            href="/dashboard/profile" 
            className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-pink-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Edit Profile</h3>
                <p className="text-purple-100 text-sm">Manage your account settings</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}