"use client";
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ShapBarChartProps {
  shapData: Record<string, number>;
}

export const ShapBarChart: React.FC<ShapBarChartProps> = ({ shapData }) => {
  // Convert shapData into array with absolute values
  const chartData = Object.entries(shapData).map(([feature, value]) => ({
    feature,
    impact: Math.abs(value), // magnitude only
  }));

  // Find min and max for scaling
  const values = chartData.map((d) => d.impact);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  // Function to interpolate between red → yellow → green
  const getColor = (value: number) => {
    if (maxVal === minVal) return "#3b82f6"; // fallback if all values same
    const ratio = (value - minVal) / (maxVal - minVal); // normalize 0-1
    if (ratio < 0.5) {
      // red → yellow
      const r = 255;
      const g = Math.round(255 * (ratio / 0.5));
      return `rgb(${r},${g},0)`;
    } else {
      // yellow → green
      const r = Math.round(255 * (1 - (ratio - 0.5) / 0.5));
      const g = 255;
      return `rgb(${r},${g},0)`;
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        SHAP Feature Importance
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" angle={-30} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(3)} />
          <Bar dataKey="impact">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.impact)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
