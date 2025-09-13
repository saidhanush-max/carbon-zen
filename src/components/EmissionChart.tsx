import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const EmissionChart = () => {
  // Mock data for pie chart - today's breakdown
  const pieData = [
    { name: "Transport", value: 4.2, color: "hsl(var(--primary))" },
    { name: "Energy", value: 2.8, color: "hsl(var(--warning))" },
    { name: "Food", value: 1.3, color: "hsl(var(--success))" },
    { name: "Shopping", value: 0.2, color: "hsl(var(--accent-foreground))" }
  ];

  // Mock data for weekly trend
  const weeklyData = [
    { day: "Mon", emissions: 8.1 },
    { day: "Tue", emissions: 6.4 },
    { day: "Wed", emissions: 7.2 },
    { day: "Thu", emissions: 5.8 },
    { day: "Fri", emissions: 9.1 },
    { day: "Sat", emissions: 4.2 },
    { day: "Sun", emissions: 8.5 }
  ];

  const COLORS = pieData.map(entry => entry.color);

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Today's Breakdown */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">Today's Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} kg CO₂`, "Emissions"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Weekly Trend */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg CO₂`, "Daily Emissions"]} />
              <Bar dataKey="emissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmissionChart;