"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FutureTrendsProps {
  predictions: number[][];
}

export const FutureTrends: React.FC<FutureTrendsProps> = ({ predictions }) => {
  // Convert predictions into chart-friendly format
  const chartData = predictions.map((probs, index) => ({
    year: `Year ${index + 1}`,
    Safe: probs[0],
    Moderate: probs[1],
    High: probs[2],
  }));

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Future Trends (5-Year Prediction)
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
          <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
          <Legend />

          <Line type="monotone" dataKey="Safe" stroke="#16a34a" strokeWidth={2} />
          <Line type="monotone" dataKey="Moderate" stroke="#f59e0b" strokeWidth={2} />
          <Line type="monotone" dataKey="High" stroke="#dc2626" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
