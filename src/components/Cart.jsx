import React from 'react';
import './Cart.css';

const Cart = ({ items, onRemoveItem, onUpdateQuantity }) => {
  const totalItems = Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(items).reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItems === 0) {
    return <div className="cart-panel">Your cart is empty.</div>;
  }

  return (
    <div className="cart-panel">
      <h2>Your Cart</h2>
      {Object.values(items).map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} alt={item.title} />
          <div className="cart-details">
            <h4>{item.title}</h4>
            <p>Price: ${item.price}</p>
            <div className="quantity-controls">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
