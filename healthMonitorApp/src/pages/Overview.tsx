// Overview.tsx
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { addVitalsData } from "../redux/vitalsSlice";
import { RootState } from "../redux/store";
import { toggleWatchConnection, toggleMobileAppStatus } from "../redux/deviceSlice";

const Overview = () => {
  const dispatch = useDispatch();

  const vitalsData = useSelector((state: RootState) => state.vitals.data);
  const deviceStatus = useSelector((state: RootState) => state.device);

  const latestVitals =
    vitalsData.length > 0 ? vitalsData[vitalsData.length - 1] : { heartRate: 0, spo2: 0 };

  useEffect(() => {
    const interval = setInterval(() => {
      if (deviceStatus.watchConnected && deviceStatus.mobileAppActive) {
        const now = new Date();
        const newPoint = {
          time: now.toLocaleTimeString().slice(0, 5),
          heartRate: 65 + Math.floor(Math.random() * 20),
          spo2: 97 + Math.floor(Math.random() * 3),
        };
        dispatch(addVitalsData(newPoint));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, deviceStatus]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vitals Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Vitals Summary</h3>
          <p className="text-sm text-gray-600">Heart Rate: {latestVitals.heartRate} bpm</p>
          <p className="text-sm text-gray-600">SpO2: {latestVitals.spo2}%</p>
        </div>

        {/* Device Status Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Device Status</h3>
          <p className="text-sm text-gray-600">
            Bluetooth Watch: {deviceStatus.watchConnected ? "Connected" : "Disconnected"}
          </p>
          <p className="text-sm text-gray-600">
            Mobile App: {deviceStatus.mobileAppActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => dispatch(toggleWatchConnection())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle Watch
        </button>
        <button
          onClick={() => dispatch(toggleMobileAppStatus())}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Toggle Mobile App
        </button>
      </div>

      {/* Heart Rate Chart */}
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Heart Rate Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={vitalsData}>
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
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">SpO2 Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={vitalsData}>
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

export default Overview;