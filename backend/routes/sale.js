// backend/routes/sale.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create a new sale record
router.post('/', async (req, res) => {
  try {
    // Expected payload: { products: [{ product: productId, quantity: number }, ...] }
    const { products } = req.body;
    const sale = new Sale({ products });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all sales for a specific day (pass a date in query string)
router.get('/', async (req, res) => {
  try {
    let { date } = req.query;
    date = date ? new Date(date) : new Date();
    // Define start and end of day
    const start = new Date(date.setHours(0,0,0,0));
    const end = new Date(date.setHours(23,59,59,999));
    const sales = await Sale.find({
      date: { $gte: start, $lte: end }
    }).populate({
      path: 'products.product',
      populate: { path: 'category' }
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
