import React from "react";

const Header = ({ search, setSearch, cartCount, onToggleCart }) => {
  return (
    <header className="bg-white shadow px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Left - Title */}
      <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
        🧱 Product Dashboard
      </h1>

      {/* Center - Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 border rounded w-full max-w-md"
        />
      </div>

      {/* Right - Cart Button */}
      <button
        onClick={onToggleCart}
        className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        <span className="text-lg">🛒</span>
        <span className="text-sm font-medium">Cart</span>
        <span className="absolute -top-2 -right-2 bg-white text-blue-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shadow">
          {cartCount}
        </span>
      </button>
    </header>
  );
};

export default Header;
