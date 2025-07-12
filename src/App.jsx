import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ProductTable from './components/ProductTable';
import CartSidebar from './components/CartSidebar';
import { generateMockProducts } from './utils/mockData';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const mock = generateMockProducts(1000);
    setProducts(mock);
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartToggle={() => setShowCart(!showCart)}
      />

      <main className="p-4 md:p-6 lg:p-8">
        <StatsCards products={products} cartItems={cartItems} />
        <ProductTable products={products} onAddToCart={handleAddToCart} />
      </main>

      <CartSidebar
        isOpen={showCart}
        items={cartItems}
        onClose={() => setShowCart(false)}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
      />
    </div>
  );
};

export default App;
