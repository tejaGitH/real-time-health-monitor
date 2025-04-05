// src/pages/Vitals.tsx
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timeFilters = ["Last 5 mins", "Last 30 mins", "Today", "All"];

const Vitals = () => {
  const vitalsData = useSelector((state: RootState) => state.vitals.data);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Simulate filtering (later we can refine this with timestamps)
  const filteredData = useMemo(() => {
    if (selectedFilter === "Last 5 mins") return vitalsData.slice(-5);
    if (selectedFilter === "Last 30 mins") return vitalsData.slice(-10);
    if (selectedFilter === "Today") return vitalsData; // mock for now
    return vitalsData;
  }, [vitalsData, selectedFilter]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) return { avg: 0, max: 0, min: 0 };
    const rates = filteredData.map((d) => d.heartRate);
    const sum = rates.reduce((a, b) => a + b, 0);
    return {
      avg: Math.round(sum / rates.length),
      max: Math.max(...rates),
      min: Math.min(...rates),
    };
  }, [filteredData]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Vitals Dashboard</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded ${
              selectedFilter === filter
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Avg HR</p>
          <p className="text-xl font-semibold text-indigo-700">{stats.avg} bpm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Max HR</p>
          <p className="text-xl font-semibold text-red-500">{stats.max} bpm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Min HR</p>
          <p className="text-xl font-semibold text-green-600">{stats.min} bpm</p>
        </div>
      </div>

      {/* Heart Rate Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Heart Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SpO2 Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">SpO2</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[95, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="spo2"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Vitals;