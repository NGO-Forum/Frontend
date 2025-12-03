import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { api } from "../../API/api";

export default function PostLineChart() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState([]);

  const loadData = async (selectedYear) => {
    const res = await api.get(`/stats/posts/monthly?year=${selectedYear}`);

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const yearData = months.map(m => ({ month: m, total: 0 }));

    res.data.forEach(item => {
      const m = parseInt(item.month.split("-")[1]) - 1;
      yearData[m].total = item.total;
    });

    setData(yearData);
  };

  useEffect(() => {
    loadData(year);
  }, [year]); // reload when year changes

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-green-700">
          Posts in {year}
        </h2>

        {/* ✓ Year selector */} 
        <select
          className="border rounded px-3 py-2"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value={currentYear}>{currentYear}</option>
          <option value={currentYear - 1}>{currentYear - 1}</option>
          <option value={currentYear - 2}>{currentYear - 2}</option>
          <option value={currentYear - 3}>{currentYear - 3}</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#9ec3e6" strokeWidth={1} vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fill: "#0077cc", fontSize: 14, fontWeight: 600 }}
            axisLine={{ stroke: "#444", strokeWidth: 1 }}
            tickLine={false}
          />

          <Tooltip cursor={{ stroke: "#ccc", strokeWidth: 1 }} />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#ff6a00"
            strokeWidth={3}
            dot={{ r: 5, fill: "#ff6a00" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
