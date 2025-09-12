"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { toast } from "react-toastify";
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface Report {
  _id: string;
  cd: number;
  hei: number;
  hmpi: number;
  sd: number;
  pd: number;
  isCritical: number;
  fut: any;
  hmap: any;
  anal: any;
  hmcs: Array<{
    name: string;
    val: number;
  }>;
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
      } catch (err) {
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

  // Convert backend hmcs into chart data
  const chartData = report.hmcs.map((hmc) => ({
    name: hmc.name,
    value: hmc.val,
  }));

  const chartConfig: ChartConfig = {
    value: {
      label: "Concentration (mg/L)",
      color: "var(--chart-1)",
    },
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/recents">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recent Reports
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Heavy Metal Analysis Report
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`p-3 rounded-full ${
                report.isCritical ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {report.isCritical ? (
                <AlertTriangle className="h-8 w-8 text-red-600" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {report.isCritical ? "Unsafe to Drink" : "Safe to Drink"}
              </h2>
              <p className="text-gray-600">
                Based on heavy metal concentration analysis
              </p>
            </div>
          </div>

          {/* Heavy Metal Concentrations */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Heavy Metal Concentrations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {report.hmcs.map((hmc, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900">{hmc.name}</h4>
                  <p className="text-lg font-semibold text-blue-600">
                    {hmc.val.toFixed(3)} mg/L
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Heavy Metal Trends</CardTitle>
              <CardDescription>Concentration levels (mg/L)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="value"
                    type="linear"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Auto-generated from report data{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing heavy metal concentration values
              </div>
            </CardFooter>
          </Card>

          {/* Contamination Index */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Cd Index
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {report.cd.toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                HEI
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {report.hei.toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                HMPI
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {report.hmpi.toFixed(2)}
              </p>
            </div>
          </div>

          {/* rest of your code unchanged ... */}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
