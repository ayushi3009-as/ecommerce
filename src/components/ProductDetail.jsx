import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="detail-status">Loading product...</div>;
  if (!product) return <div className="detail-status">Product not found.</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.thumbnail} alt={product.title} />
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>Stock:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <p className="description">{product.description}</p>

          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
