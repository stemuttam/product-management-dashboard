import React from "react";

const StatsCards = ({ products }) => {
  const totalProducts = products.length;
  const totalRevenue = 0; // Add logic if needed
  const lowStockItems = products.filter((p) => p.stock < 20).length;
  const categories = new Set(products.map((p) => p.category)).size;

  const stats = [
    { title: "Total Products", icon: "📦", value: totalProducts },
    { title: "Total Revenue", icon: "💰", value: `₹${totalRevenue.toFixed(2)}` },
    { title: "Low Stock Items", icon: "⚠️", value: lowStockItems },
    { title: "Categories", icon: "🏷️", value: categories },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {stats.map((s, i) => (
        <div key={i} className="p-4 border rounded-lg bg-white shadow-sm text-center">
          <div className="text-2xl mb-1">{s.icon}</div>
          <p className="text-sm text-gray-600">{s.title}</p>
          <p className="text-lg font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
