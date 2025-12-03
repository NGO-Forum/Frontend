import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../../API/api";

export default function PostLineChart() {
  const [data, setData] = useState([]);

  const loadChart = async () => {
    try {
      const res = await api.get("/stats/posts/monthly");

      // Convert API to chart format
      const formatted = res.data.map(item => ({
        month: item.month,
        total: item.total
      }));

      setData(formatted);

    } catch (err) {
      console.error("Error loading chart:", err);
    }
  };

  useEffect(() => {
    loadChart();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-green-700">Posts in Last 12 Months</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
