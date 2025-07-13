import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ProductTable from "./components/ProductTable";
import CartSidebar from "./components/CartSidebar";
import { generateMockProducts } from "./utils/generateMockProducts";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const stored = sessionStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const data = generateMockProducts(1000);
    setProducts(data);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      <StatsCards products={products} />
      <ProductTable products={products} onAddToCart={addToCart} />
      {isCartOpen && (
        <CartSidebar
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
};

export default App;
