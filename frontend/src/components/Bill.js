// frontend/src/components/Bill.js
import React from 'react';

const Bill = ({ billItems }) => {
  if (!billItems || billItems.length === 0) return null;

  return (
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
          {billItems.map((item, index) => (
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
  );
};

export default Bill;
