import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState({});
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev[product.id] || { ...product, quantity: 0 };
      return {
        ...prev,
        [product.id]: { ...existing, quantity: existing.quantity + 1 }
      };
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    setCartItems(prev => {
      if (newQty < 1) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], quantity: newQty }
      };
    });
  };

  const totalCount = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <header>
        <h1>PRODUCT LISTING</h1>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          Cart ({totalCount})
        </button>
      </header>

      {showCart && (
        <Cart
          items={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}

      {/* Pass onAddToCart and cartItems as props */}
      <ProductList onAddToCart={handleAddToCart} cartItems={cartItems} />
    </div>
  );
};

export default App;
