import React from 'react';

const Header = ({ cartCount, onCartToggle }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-10">
      <div className="text-xl font-bold text-blue-600">📦 Product Dashboard</div>
      <div className="relative">
        <button
          onClick={onCartToggle}
          className="relative flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
