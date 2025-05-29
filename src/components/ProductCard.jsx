import React from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, count }) => {
  const { id, title, price, category, rating, thumbnail } = product;

  return (
    <div className="product-card">
      {/* ✅ Wrap image and title with Link */}
      <Link to={`/product/${id}`} className="product-link">
        <img src={thumbnail} alt={title} />
        <h2>{title}</h2>
      </Link>

      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Rating:</strong> {rating}</p>

      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      {count > 0 && <p className="cart-count">In Cart: {count}</p>}
    </div>
  );
};

export default ProductCard;
