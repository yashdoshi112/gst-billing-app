// frontend/src/components/CategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({isLogin, setIsLogin, isAdmin, setIsAdmin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create a new category
      if((username == 'admin' && password == 'admin')){
        alert('Logged In successfully!');
        setIsAdmin(true);
        setIsLogin(true);
        setUsername('');
        setPassword(''); 
      } else if((username == 'normal' && password == 'normal')) {
        setIsAdmin(false);
        setIsLogin(true);
        setUsername('');
        setPassword(''); 
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Error while logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="UserName" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategoryForm;
