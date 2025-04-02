// backend/models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  gstRate: { type: Number, required: true } // e.g. 5, 10, 20
});

module.exports = mongoose.model('Category', CategorySchema);
