// frontend/src/components/SaleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleForm = () => {
  const [products, setProducts] = useState([]);
  const [saleItems, setSaleItems] = useState([{ product: '', quantity: 1 }]);
  const [bill, setBill] = useState(null);

  // Fetch products to populate dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  // Add an extra row for additional products
  const addSaleItem = () => {
    setSaleItems([...saleItems, { product: '', quantity: 1 }]);
  };

  const handleSaleItemChange = (index, field, value) => {
    const items = [...saleItems];
    items[index][field] = value;
    setSaleItems(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Record the sale in the backend
      await axios.post('http://localhost:5000/api/sales', { products: saleItems });
      alert('Sale recorded successfully!');

      // Calculate final bill details from sale items
      let finalBill = saleItems.map(item => {
        const prod = products.find(p => p._id === item.product);
        if (prod) {
          const baseAmount = prod.price * item.quantity;
          // Assuming category object contains gstRate because of population in backend
          const gstAmount = baseAmount * (prod.category.gstRate / 100);
          return { 
            product: prod.name, 
            quantity: item.quantity, 
            price: prod.price, 
            gst: prod.category.gstRate, 
            baseAmount, 
            gstAmount, 
            total: baseAmount + gstAmount 
          };
        }
        return null;
      }).filter(item => item !== null);
      setBill(finalBill);
    } catch (error) {
      console.error(error);
      alert('Error recording sale');
    }
  };

  return (
    <div>
      <h2>Record Sale</h2>
      <form onSubmit={handleSubmit}>
        {saleItems.map((item, index) => (
          <div key={index}>
            <select 
              value={item.product} 
              onChange={e => handleSaleItemChange(index, 'product', e.target.value)} 
              required
            >
              <option value="">Select Product</option>
              {products.map(prod => (
                <option key={prod._id} value={prod._id}>{prod.name}</option>
              ))}
            </select>
            <input 
              type="number" 
              value={item.quantity} 
              min="1" 
              onChange={e => handleSaleItemChange(index, 'quantity', e.target.value)} 
              required 
            />
          </div>
        ))}
        <button type="button" onClick={addSaleItem}>Add More</button>
        <button type="submit">Submit Sale</button>
      </form>
      {bill && (
        <div>
          <h3>Final Bill</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>GST (%)</th>
                <th>Base Amount</th>
                <th>GST Amount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.gst}</td>
                  <td>{item.baseAmount}</td>
                  <td>{item.gstAmount}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SaleForm;
