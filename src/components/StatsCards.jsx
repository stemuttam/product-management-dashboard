// src/components/StatsCards.jsx
import React from 'react';

const StatCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md border border-gray-200 p-4 w-full h-32 text-center hover:shadow-lg transition">
    <div className="text-2xl">{icon}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
    <div className="text-xl font-semibold text-gray-800 mt-1">{value}</div>
  </div>
);

const StatsCards = ({ products, cartItems }) => {
  const totalProducts = products.length;
  const totalRevenue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lowStock = products.filter((p) => p.stock < 20).length;
  const categories = [...new Set(products.map((p) => p.category))].length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard icon="📦" label="Total Products" value={totalProducts} />
      <StatCard icon="💰" label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
      <StatCard icon="⚠️" label="Low Stock Items" value={lowStock} />
      <StatCard icon="🏷️" label="Categories" value={categories} />
    </div>
  );
};

export default StatsCards;
