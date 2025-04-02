// backend/models/Sale.js
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  // Array of items in a sale; each item refers to a product and its quantity
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  date: { type: Date, default: Date.now }  // Automatically record sale date
});

module.exports = mongoose.model('Sale', SaleSchema);
