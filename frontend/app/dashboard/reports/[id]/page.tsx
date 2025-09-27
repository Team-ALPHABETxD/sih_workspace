"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReportCard from "@/components/reportCard";

interface Location {
  lat: number;
  lon: number;
  _id?: string;
}

interface HmapData {
  curr: Location;
  high: Location[];
  modarate: Location[];
  low: Location[];
}

interface FutureData {
  prediction: number[][];
  shap: Record<string, number>;
}

interface Analysis {
  deseases: string[];
  precautions: string[];
}

interface HeavyMetal {
  name: string;
  val: number;
  _id?: string;
}

interface Report {
  _id: string;
  cd: number;
  hei: number;
  hmpi: number;
  sd: number;
  pd: number;
  isCritical: boolean;
  fut: FutureData;
  hmap: HmapData;
  anal: Analysis;
  hmcs: HeavyMetal[];
  anoms?: {
    decision: string;
    reasons: string[];
  };
}

const ReportDetailPage: React.FC = () => {
  const params = useParams();
  const reportId = params.id as string;
  const { isAuthenticated } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!isAuthenticated) {
        setError("Please login to view the report.");
        setLoading(false);
        return;
      }

      if (!reportId) {
        setError("No report ID provided.");
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

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/report/get/${reportId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Report data received:", data);
          if (data.flag === "success") {
            setReport(data.report);
          } else {
            setError(data.msg || "Failed to fetch report");
          }
        } else {
          console.error("Failed to fetch report, status:", response.status);
          setError("Failed to fetch report");
        }
      } catch {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Error Loading Report
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/dashboard/recents">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Recent Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Report Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The requested report could not be found.
            </p>
            <Link href="/dashboard/recents">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Recent Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      {report && <ReportCard report={report} />}
    </div>
  );
};

export default ReportDetailPage;
