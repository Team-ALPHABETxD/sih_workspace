"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { RiChat3Line, RiCloseLine } from "react-icons/ri";


import { useAuth } from "@/lib/auth-context";
import { HeavyMetalTrends } from "./HeavyMetalTrends";
import { FutureTrends } from "./FutureTrends";
import { ShapBarChart } from "./ShapBarChart";
import Heatmap from "./HeatMap";

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

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const { token: authTokenFromContext } = useAuth() as any;
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; from: "bot" | "user"; text: string }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const chartData = report.hmcs.map((hmc) => ({
    name: hmc.name,
    value: hmc.val,
  }));

  const chartConfig = {
    value: {
      label: "Concentration (mg/L)",
      color: "var(--chart-1)",
    },
  };

  const reportId = report._id || (report as any).id;

  const sendMessageToBackend = async (text: string) => {
    if (!reportId) {
      toast.error("Report id not found — cannot chat.");
      return;
    }

    setSending(true);
    const userMsgId = `${Date.now()}-u`;
    setMessages((m) => [...m, { id: userMsgId, from: "user", text }]);
    setInputValue("");

    try {
      const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const token =
        (authTokenFromContext as string) ||
        (typeof window !== "undefined"
          ? localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("mm_token")
          : null);

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        `${API_BASE}/server/v1/apis/report/chat/${reportId}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ q: text }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.flag !== "success") {
        const msg = data?.msg || data?.error || "Failed to get reply from bot.";
        setMessages((m) => [
          ...m,
          { id: `${Date.now()}-err`, from: "bot", text: `Error: ${msg}` },
        ]);
        toast.error("Chat error: " + msg);
      } else {
        const botReply =
          typeof data.rep === "string" ? data.rep : JSON.stringify(data.rep);
        setMessages((m) => [
          ...m,
          { id: `${Date.now()}-b`, from: "bot", text: botReply },
        ]);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: `${Date.now()}-err2`,
          from: "bot",
          text: "Server error while chatting.",
        },
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
            Based on heavy metal concentration analysis (HMPI Index)
          </p>
        </div>
      </div>

      {/* Contamination Indexes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cd */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Cd Index</h3>
              <p className="text-3xl font-bold text-blue-600">
                {report.cd.toFixed(2)}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-medium">Contamination Degree (Cd):</span>
                Measures how much heavy metal concentrations exceed their permissible
                limits.
                <br></br>
                Formula: <code>Σ (Ci / Si – 1)</code>, where <code>Ci</code> = concentration of metal i,
                <code>Si</code> = permissible standard.
              </p>
            </div>

            {/* HEI */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">HEI</h3>
              <p className="text-3xl font-bold text-purple-600">
                {report.hei.toFixed(2)}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-medium">Heavy Metal Evaluation Index (HEI):</span>
                Indicates the overall degree of heavy metal pollution.
                <br></br>
                Formula: <code>Σ (Ci / Si)</code>.
              </p>
            </div>

            {/* HMPI */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">HMPI</h3>
              <p className="text-3xl font-bold text-green-600">
                {report.hmpi.toFixed(2)}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-medium">Heavy Metal Pollution Index (HMPI):</span>
                Weighted index that accounts for concentration and permissible limits.
                Formula: <code>Σ (Wi × Qi) / Σ Wi</code>,
                where <code>Qi = (Ci / Si) × 100</code>, <code>Wi = 1 / Si</code>.
              </p>
            </div>
          </div>

      {/* SD / PD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Severity Degree (SD)
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

      {/* Graphs */}
      <HeavyMetalTrends chartData={chartData} chartConfig={chartConfig} />

      {/* Future Trends */}
      {report.fut && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Future Predictions
          </h3>
          {report.fut.prediction && (
            <FutureTrends predictions={report.fut.prediction} />
          )}
          {report.fut.shap && <ShapBarChart shapData={report.fut.shap} />}
        </div>
      )}

      {/* Heatmap */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Heatmap</h3>
        {report.hmap ? <Heatmap hmap={report.hmap} /> : <p>No heatmap data</p>}
      </div>

      {/* AI Analysis */}
      {report.anal && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <span>AI Analysis</span>
          </h3>
          {report.anal.deseases && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>Diseases</span>
              </h4>
              <ul className="list-disc list-inside text-gray-700">
                {report.anal.deseases.map((d: string, i: number) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
          {report.anal.precautions && (
            <div>
              <h4 className="font-semibold text-gray-800 flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Precautions</span>
              </h4>
              <ul className="list-disc list-inside text-gray-700">
                {report.anal.precautions.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Floating Chatbot */}
      {!chatOpen && (
        <button
          onClick={() => {
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

      {chatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col">
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
            <button onClick={() => setChatOpen(false)} className="p-1 rounded">
              <RiCloseLine className="w-5 h-5 text-gray-600" />
            </button>
          </div>

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
                    <div className="text-right mb-1 text-xs text-gray-500">
                      You
                    </div>
                    <div className="bg-black text-white p-2 rounded-lg whitespace-pre-wrap">
                      {m.text}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

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
  );
};

export default ReportCard;
