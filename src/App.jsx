import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ProductTable from "./components/ProductTable";
import CartSidebar from "./components/CartSidebar";
import { generateMockProducts } from "./utils/generateMockProducts";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const session = sessionStorage.getItem("cart");
    return session ? JSON.parse(session) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(generateMockProducts(1000));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartItems.length}
        onToggleCart={() => setIsCartOpen(true)}
      />

      <main className="container mx-auto px-4 py-6">
        <StatsCards products={products} />
        <ProductTable
          products={products}
          onAddToCart={handleAddToCart}
          onUpdateProducts={setProducts}
          search={search}
        />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
};

export default App;
