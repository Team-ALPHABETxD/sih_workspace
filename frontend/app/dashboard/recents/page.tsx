"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface Report {
  _id: string;
  cd: number;
  hei: number;
  hmpi: number;
  sd: number;
  pd: number;
  isCritical: number;
  createdAt?: string;
}

export default function RecentsPage() {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchReports = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/report/getall`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.flag === "success") {
            // Sort reports by creation date (most recent first)
            const sortedReports = data.reports.sort((a: Report, b: Report) => {
              const timestampA = parseInt(a._id.substring(0, 8), 16);
              const timestampB = parseInt(b._id.substring(0, 8), 16);
              return timestampB - timestampA; // Descending order (newest first)
            });
            setReports(sortedReports);
          } else {
            setError(data.msg || "Failed to fetch reports");
          }
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [isAuthenticated]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Recent Reports
            </h1>
            <p className="text-gray-600 text-lg">Loading your water quality analysis reports...</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Recent Reports
            </h1>
            <p className="text-gray-600 text-lg">There was an issue loading your reports</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Recent Reports
            </h1>
            <p className="text-gray-600 text-lg">Please log in to view your reports</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center p-8 bg-blue-50 rounded-2xl border border-blue-200">
            <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-blue-600 font-medium">Please log in to view your reports.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Recent Reports
          </h1>
          <p className="text-gray-600 text-lg">Your latest water quality analysis reports</p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid of Professional Vertical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reports.slice(0, visibleCount).map((report, index) => {
          // Extract timestamp from MongoDB _id (first 8 characters are timestamp)
          const timestamp = parseInt(report._id.substring(0, 8), 16) * 1000;
          const date = new Date(timestamp).toLocaleDateString();
          const title = `Water Quality Report ${report._id.substring(18, 24).toUpperCase()}`;

          return (
            <div key={report._id} className="group">
              {/* Professional Vertical Card */}
              <div className="h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 font-medium">{date}</div>
                      <div className="text-xs text-gray-400">Generated</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
                  
                  {/* Status Badge */}
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active Report
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-4">
                  <div className="space-y-3">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 font-medium mb-1">HPI Score</div>
                        <div className="text-lg font-bold text-gray-800">{report.hmpi.toFixed(2)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 font-medium mb-1">Safety Degree</div>
                        <div className="text-lg font-bold text-gray-800">{report.sd.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Critical Warning */}
                    {report.isCritical && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-xs font-medium text-red-700">Critical for drinking</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <Link href={`/dashboard/reports/${report._id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < reports.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Load More Reports
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
