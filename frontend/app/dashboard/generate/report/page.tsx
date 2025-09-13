"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { toast } from "react-toastify";
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
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
import { FutureTrends } from "./_components/futureTrends";
import { ShapBarChart } from "./_components/ShapBarCharts";

import { RiChat3Line, RiCloseLine } from "react-icons/ri";

interface Report {
  _id?: string;
  cd: number;
  hei: number;
  hmpi: number;
  sd: string | number;
  pd: string | number;
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
  const { isAuthenticated, token: authTokenFromContext } = useAuth() as any;
  const [report, setReport] = useState<Report | null>(null);

  // Chat widget state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; from: "bot" | "user"; text: string }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

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

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

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

  // Determine report id (try common fields)
  const reportId = (report && ((report as any)._id || (report as any).id)) || null;

  /**
   * Send a message to backend chat route.
   * - Tries to use credentials: "include" (cookie-based) and also Authorization header if token is available.
   * - Expects backend response { flag: "success", rep: <string> }
   *
   * NOTE: set NEXT_PUBLIC_API_BASE_URL in your .env (see instructions below).
   */
  const sendMessageToBackend = async (text: string) => {
    if (!reportId) {
      toast.error("Report id not found — cannot chat.");
      return;
    }

    setSending(true);

    // Optimistically show user's message
    const userMsgId = `${Date.now()}-u`;
    setMessages((m) => [...m, { id: userMsgId, from: "user", text }]);
    setInputValue("");

    try {
      // get API base from env (NEXT_PUBLIC_ so it is available client-side)
      // Fallback: use same origin + /api if env var isn't set
      const API_BASE =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        `${window.location.origin}/api`; // adjust according to how your server is mounted

      // Build headers; include Authorization if token found (from useAuth or localStorage)
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const token =
        (authTokenFromContext as string) ||
        (typeof window !== "undefined" ? localStorage.getItem("token") || localStorage.getItem("authToken") || localStorage.getItem("mm_token") : null);

      if (token) {
        // If your backend uses a different header name (eg "x-auth-token"), replace "Authorization" below.
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/report/chat/${reportId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ q: text }),
      });

      const data = await res.json();

      if (!res.ok || data.flag !== "success") {
        console.error("Chat API error:", data);
        const msg = data?.msg || data?.error || "Failed to get reply from bot.";
        setMessages((m) => [
          ...m,
          { id: `${Date.now()}-err`, from: "bot", text: `Error: ${msg}` },
        ]);
        toast.error("Chat error: " + msg);
      } else {
        // data.rep may be string or array. Normalize to string.
        const botReply =
          typeof data.rep === "string" ? data.rep : JSON.stringify(data.rep);
        setMessages((m) => [...m, { id: `${Date.now()}-b`, from: "bot", text: botReply }]);
      }
    } catch (err) {
      console.error("Chat request failed:", err);
      setMessages((m) => [
        ...m,
        { id: `${Date.now()}-err2`, from: "bot", text: "Server error while chatting." },
      ]);
      toast.error("Server error while chatting.");
    } finally {
      setSending(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    await sendMessageToBackend(trimmed);
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
              className={`p-3 rounded-full ${report.isCritical ? "bg-red-100" : "bg-green-100"
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

          {/* Detailed Analysis */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Future Predictions
              </h3>
              {report.fut?.prediction && (
                <div className="mt-6">
                  < FutureTrends predictions={report.fut.prediction} />
                </div>
              )}
              {report.fut?.shap && (
                <div className="mt-6">
                  <ShapBarChart shapData={report.fut.shap} />
                </div>
              )}

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

      {/* ----------------------
          Chatbot Floating Button
          ---------------------- */}
      <div>
        {/* Circular floating button */}
        {!chatOpen && (
          <button
            aria-label="Open report chat"
            onClick={() => {
              // initialize messages with a welcome from Aevi (optional)
              setMessages([
                {
                  id: `welcome-${Date.now()}`,
                  from: "bot",
                  text: `Hi — I'm Aevi. I can answer questions about this report. Ask me anything.`,
                },
              ]);
              setChatOpen(true);
            }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform"
          >
            <RiChat3Line className="w-6 h-6" />
          </button>
        )}

        {/* Chat popup card */}
        {chatOpen && (
          <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                  A
                </div>
                <div>
                  <div className="text-sm font-semibold">Aevi</div>
                  <div className="text-xs text-gray-500">Report assistant</div>
                </div>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setChatOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <RiCloseLine className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Messages (scrollable) */}
            <div
              ref={messagesRef}
              className="px-3 py-3 flex-1 overflow-y-auto space-y-3 max-h-64"
            >
              {messages.length === 0 && (
                <div className="text-center text-sm text-gray-500">
                  Start the conversation
                </div>
              )}

              {messages.map((m) =>
                m.from === "bot" ? (
                  <div key={m.id} className="flex items-start space-x-3">
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
                      A
                    </div>
                    <div className="max-w-[80%]">
                      <div className="text-xs text-gray-500 mb-1">Aevi</div>
                      <div className="bg-gray-200 text-gray-900 p-2 rounded-lg whitespace-pre-wrap">
                        {m.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex items-start justify-end">
                    <div className="max-w-[80%]">
                      <div className="text-right mb-1 text-xs text-gray-500">You</div>
                      <div className="bg-black text-white p-2 rounded-lg whitespace-pre-wrap">
                        {m.text}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="px-3 py-3 border-t flex items-center gap-2"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Aevi about this report..."
                className="flex-1 px-3 py-2 rounded-lg border focus:outline-none"
                disabled={sending}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                type="submit"
                disabled={sending}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
              >
                {sending ? "..." : "Send"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedReportPage;
