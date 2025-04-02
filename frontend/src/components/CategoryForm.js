// frontend/src/components/CategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [gstRate, setGstRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create a new category
      await axios.post('http://localhost:5000/api/categories', { name, gstRate });
      alert('Category created successfully!');
      setName('');
      setGstRate('');
    } catch (error) {
      console.error(error);
      alert('Error creating category');
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Category Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="GST Rate" 
          value={gstRate} 
          onChange={e => setGstRate(e.target.value)} 
          required 
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
