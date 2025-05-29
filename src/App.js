import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState({});
  const [showCart, setShowCart] = useState(false);

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev[product.id] || { ...product, quantity: 0 };
      return {
        ...prev,
        [product.id]: { ...existing, quantity: existing.quantity + 1 },
      };
    });
  };

  // ✅ Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // ✅ Update item quantity
  const handleUpdateQuantity = (id, newQty) => {
    setCartItems((prev) => {
      if (newQty < 1) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], quantity: newQty },
      };
    });
  };

  // ✅ Total count of cart items
  const totalCount = Object.values(cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Product Listing Page</h1>
          <button className="cart-button" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({totalCount})
          </button>
        </header>

        {showCart && (
          <Cart
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={<ProductList onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
