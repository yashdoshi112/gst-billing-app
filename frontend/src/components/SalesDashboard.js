// frontend/src/components/SalesDashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const SalesDashboard = () => {
  const [revenue, setRevenue] = useState(null);
  const [period, setPeriod] = useState('day');
  const [date, setDate] = useState('');

  const fetchRevenue = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/dashboard?period=${period}&date=${date}`);
      setRevenue(res.data.totalRevenue);
    } catch (error) {
      console.error(error);
      alert('Error fetching revenue');
    }
  };

  return (
    <div>
      <h2>Sales Dashboard</h2>
      <div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={fetchRevenue}>Get Revenue</button>
      </div>
      {revenue !== null && (
        <div>
          <h3>Total Revenue: {revenue}</h3>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;
