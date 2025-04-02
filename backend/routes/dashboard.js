// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Endpoint to calculate total revenue for a given period (day, month, or year)
router.get('/', async (req, res) => {
  try {
    const { period, date } = req.query; // period can be 'day', 'month', or 'year'
    const d = date ? new Date(date) : new Date();
    let start, end;
    if (period === 'month') {
      start = new Date(d.getFullYear(), d.getMonth(), 1);
      end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
    } else if (period === 'year') {
      start = new Date(d.getFullYear(), 0, 1);
      end = new Date(d.getFullYear(), 11, 31, 23, 59, 59);
    } else {
      // Default to day period
      start = new Date(d.setHours(0, 0, 0, 0));
      end = new Date(d.setHours(23, 59, 59, 999));
    }

    const sales = await Sale.find({
      date: { $gte: start, $lte: end }
    }).populate({
      path: 'products.product',
      populate: { path: 'category' }
    });

    // Calculate total revenue including GST for each sale item
    let totalRevenue = 0;
    sales.forEach(sale => {
      sale.products.forEach(item => {
        const product = item.product;
        const baseAmount = product.price * item.quantity;
        const gstAmount = baseAmount * (product.category.gstRate / 100);
        totalRevenue += baseAmount + gstAmount;
      });
    });

    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
