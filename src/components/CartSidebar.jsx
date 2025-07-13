import React from "react";

const CartSidebar = ({ cartItems, onClose, onUpdateQuantity, onRemove }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">🛒 Cart</h2>
        <button onClick={onClose} className="text-red-500 text-xl font-semibold">✖</button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center gap-3 border-b pb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-14 border rounded px-2 py-1 text-sm"
                  />
                  <span className="text-sm text-gray-700">× ₹{item.price.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-600 text-lg">🗑</button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 font-semibold text-base">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
};

export default CartSidebar;
