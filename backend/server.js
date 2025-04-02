// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB (adjust connection string as needed)
mongoose.connect('mongodb://localhost:27017/gstapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Import API routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const saleRoutes = require('./routes/sale');
const dashboardRoutes = require('./routes/dashboard');

// Mount routes under /api/ endpoint
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
