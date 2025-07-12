import React from 'react';

const CartSidebar = ({ isOpen, items, onClose, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">🛒 Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">×</button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
                  className="w-16 mt-1 border rounded px-1 text-sm"
                />
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-500 hover:underline">Remove</button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t font-bold flex justify-between">
        <span>Total:</span>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default CartSidebar;
