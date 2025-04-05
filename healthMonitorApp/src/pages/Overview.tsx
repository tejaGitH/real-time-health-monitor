import React,{useEffect, useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
    time: string;
    heartRate: number;
}


const Overview = () => {

    const [data, setData] = useState<DataPoint[]>([
        { time: "10:00", heartRate: 72 },
        { time: "10:05", heartRate: 74 },
        { time: "10:10", heartRate: 70 },
        { time: "10:15", heartRate: 76 },
        { time: "10:20", heartRate: 73 },   
    ])

    //simulate new data every 3 seconds
    useEffect(()=>{
        const interval = setInterval(()=>{
            const now = new Date();
            const newPoint = {
                time: now.toLocaleTimeString().slice(0,5), //eg 10:30
                heartRate: 65 + Math.floor(Math.random() * 20), //random bpm between 65-85
        };
    setData((prev)=>[...prev.slice(-9), newPoint]); //Keep only last 10 points
    },3000);
    return ()=> clearInterval(interval);
    },[]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vitals Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Vitals Summary</h3>
          <p className="text-sm text-gray-600">Heart Rate: 72 bpm</p>
          <p className="text-sm text-gray-600">SpO2: 98%</p>
        </div>

        {/* Device Status Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Device Status</h3>
          <p className="text-sm text-gray-600">Bluetooth Watch: Connected</p>
          <p className="text-sm text-gray-600">Mobile App: Active</p>
        </div>
      </div>

      {/* Chart Section  new div*/} 
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Heart Rate Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{r :3}}
                activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;