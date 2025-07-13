import React from "react";

const Header = ({ cartCount, onCartClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
        📦 Product Dashboard
      </h1>
      <button
        onClick={onCartClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🛒 Cart
        <span className="bg-white text-blue-600 rounded-full px-2 text-sm font-semibold">
          {cartCount}
        </span>
      </button>
    </div>
  );
};

export default Header;
