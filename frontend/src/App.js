// frontend/src/App.js
import React from 'react';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import SaleForm from './components/SaleForm';
import SalesDashboard from './components/SalesDashboard';

function App() {
  return (
    <div className="container">
      <h1>GST Billing Application</h1>
      {/* Form to create product categories and set GST */}
      <CategoryForm />
      {/* Form to add products in categories */}
      <ProductForm />
      {/* Form to record a sale and generate a bill */}
      <SaleForm />
      {/* Dashboard to view sales and revenue */}
      <SalesDashboard />
    </div>
  );
}

export default App;
