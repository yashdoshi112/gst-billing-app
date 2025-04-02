// frontend/src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch available categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to add a new product
      await axios.post('http://localhost:5000/api/products', { name, category, price });
      alert('Product created successfully!');
      setName('');
      setCategory('');
      setPrice('');
    } catch (error) {
      console.error(error);
      alert('Error creating product');
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          required 
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
