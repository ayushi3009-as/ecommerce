import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [cartCounts, setCartCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
            count={cartCounts[product.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
