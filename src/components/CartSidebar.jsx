import React from "react";

const CartSidebar = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">🛒 Cart</h2>
        <button
          onClick={onClose}
          className="text-red-600 text-xl font-bold hover:text-red-800"
        >
          &times;
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 border-b py-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                </p>
              </div>
              <button
                className="text-red-500 text-xs hover:underline"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <p className="text-sm font-medium">
          Subtotal: <span className="float-right">₹{totalPrice.toFixed(2)}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Taxes & Fees: <span className="float-right">₹522.00</span>
        </p>
        <hr className="my-2" />
        <p className="text-base font-bold">
          Total:{" "}
          <span className="float-right">
            ₹{(totalPrice + 522).toFixed(2)}
          </span>
        </p>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={() => alert("Proceeding to checkout...")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
