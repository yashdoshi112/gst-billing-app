    // backend/routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new product category with GST rate
router.post('/', async (req, res) => {
  try {
    const { name, gstRate } = req.body;
    const category = new Category({ name, gstRate });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all product categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
