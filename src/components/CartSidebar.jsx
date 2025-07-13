// src/components/CartSidebar.jsx
import React from 'react';

const CartSidebar = ({ isOpen, onClose, items, updateQuantity, removeItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-xl font-bold">&times;</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)] space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-3 items-start border-b pb-3">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">₹{item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-xs hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t text-right font-semibold">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
};

export default CartSidebar;
