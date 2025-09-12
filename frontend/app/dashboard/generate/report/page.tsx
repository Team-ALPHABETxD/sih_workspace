"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { toast } from "react-toastify";
import { CheckCircle, AlertTriangle, AlertCircle, ShieldCheck, TrendingUp } from "lucide-react";
import Heatmap from "./_components/Heatmap";
import { ChartBarLabel } from "./_components/ChartBarLabel";
import { HeavyMetalTrends } from "./_components/HeavyMetalTrends";

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
  cd: number;
  hei: number;
  hmpi: number;
  sd: string;
  pd: string;
  isCritical: boolean;
  fut: any;
  hmap: any;
  anal: any;
  hmcs: Array<{
    name: string;
    val: number;
  }>;
}

const GeneratedReportPage: React.FC = () => {
  const searchParams = useSearchParams();
  const reportData = searchParams.get("reportData");
  const { isAuthenticated } = useAuth();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view the report.");
      return;
    }

    if (reportData) {
      try {
        const parsedReport = JSON.parse(decodeURIComponent(reportData));

        // Map Cd index to Safety Degree
        let sd = "";
        if (parsedReport.sd === 0) sd = "Safe";
        else if (parsedReport.sd === 1) sd = "Moderate";
        else if (parsedReport.sd === 2) sd = "Highly Contaminated";
        else sd = "Unknown";

        // Map Pd index to Pollution Degree
        let pd = "";
        if (parsedReport.pd === 0) pd = "Low Polluted";
        else if (parsedReport.pd === 1) pd = "Moderate Polluted";
        else if (parsedReport.pd === 2) pd = "Highly Polluted";
        else pd = "Unknown";

        setReport({
          ...parsedReport,
          sd,
          pd,
        });
      } catch (error) {
        console.error("Error parsing report data:", error);
        toast.error("Invalid report data.");
      }
    } else {
      toast.error("No report data provided.");
    }
  }, [reportData, isAuthenticated]);

  if (!report) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading report...</p>
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
              <h3 className="text-lg font-semibold text-purple-900 mb-2">HEI</h3>
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

          {/* Degree Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Safety Degree (SD)
              </h3>
              <p className="text-xl font-medium text-gray-700">{report.sd}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Pollution Degree (PD)
              </h3>
              <p className="text-xl font-medium text-gray-700">{report.pd}</p>
            </div>
          </div>

          {/* NEW: Graph */}
          <HeavyMetalTrends chartData={chartData} chartConfig={chartConfig} />

          {/* Added ChartBarLabel component */}
          <div className="mt-8">
            <ChartBarLabel />
          </div>

         

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Heatmap</h3>
              {report.hmap ? (
                <Heatmap hmap={report.hmap} />
              ) : (
                <p>No heatmap data available</p>
              )}
            </div>

               {/* Detailed Analysis */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Future Predictions
              </h3>
              <pre className="bg-white p-4 rounded text-sm overflow-x-auto border">
                {JSON.stringify(report.fut, null, 2)}
              </pre>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Heatmap
              </h3>
              {report.hmap ? (
                <Heatmap hmap={report.hmap} />
              ) : (
                <p>No heatmap data available</p>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <span>AI Analysis</span>
              </h3>
              {report.anal && (
                <>
                  {report.anal.deseases && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span>Diseases</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {report.anal.deseases.map(
                          (disease: string, index: number) => (
                            <li key={index}>{disease}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {report.anal.precautions && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Precautions</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {report.anal.precautions.map(
                          (precaution: string, index: number) => (
                            <li key={index}>{precaution}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Print Report
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Generate Another Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedReportPage;
