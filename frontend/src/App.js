// frontend/src/App.js
import React, {useState} from 'react';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import SaleForm from './components/SaleForm';
import SalesDashboard from './components/SalesDashboard';
import Login from './components/Login'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <div className="container">
      <h1>GST Billing Application</h1>
      {!isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}
      {/* Form to create product categories and set GST */}
      {isLogin && isAdmin && <CategoryForm />}
      {/* Form to add products in categories */}
      {isLogin &&  isAdmin && <ProductForm />}
      {/* Form to record a sale and generate a bill */}
      {isLogin && !isAdmin && <SaleForm />}
      {/* Dashboard to view sales and revenue */}
      {isLogin && isAdmin && <SalesDashboard />}
    </div>
  );
}

export default App;
