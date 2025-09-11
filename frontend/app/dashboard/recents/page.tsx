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
      <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Reports
        </h1>
        <div className="flex justify-center items-center h-64">
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Reports
        </h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Reports
        </h1>
        <div className="flex justify-center items-center h-64">
          <p>Please log in to view your reports.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Recent Reports
      </h1>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.slice(0, visibleCount).map((report) => {
          // Extract timestamp from MongoDB _id (first 8 characters are timestamp)
          const timestamp = parseInt(report._id.substring(0, 8), 16) * 1000;
          const date = new Date(timestamp).toLocaleDateString();
          const title = `Water Quality Report ${report._id.substring(18, 24).toUpperCase()}`;

          return (
            <Card key={report._id} className="shadow-md border rounded-2xl">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Generated on: {date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  HPI: {report.hmpi.toFixed(2)} | Safety Degree: {report.sd.toFixed(2)}
                  {report.isCritical ? " | Critical for drinking" : ""}
                </p>
              </CardContent>
              <CardFooter>
              <Link href={`/dashboard/reports/${report._id}`}>
                <Button
                  className="w-full rounded-full text-white"
                  style={{ backgroundColor: "#FFB07C" }} // peach color
                >
                  View Report
                </Button>
              </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < reports.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            className="rounded-full bg-gray-800 hover:bg-gray-900 text-white px-6"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
