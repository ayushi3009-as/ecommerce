import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, count }) => {
  const { title, price, category, rating, thumbnail } = product;

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Rating:</strong> {rating}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
      {count > 0 && <p className="cart-count">In Cart: {count}</p>}
    </div>
  );
};

export default ProductCard;
