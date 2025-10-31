const express = require('express');
const { v4: uuidv4 } = require('uuid');
// const { authMiddleware } = require('../middleware/auth');
// const { validateProduct } = require('../middleware/validation');
const { ValidationError } = require('../errors/ValidationError');

const router = express.Router();

let products = [
  {
    id: uuidv4(),
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones',
    price: 120.99,
    category: 'Electronics',
    inStock: true,
  },
];

// GET all products
router.get('/', (req, res) => {
  const { category, page = 1, limit = 5, search } = req.query;

  let filtered = [...products];
  if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + Number(limit));

  res.json({
    total: filtered.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  });
});

// GET single product
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new ValidationError('Product not found'));
  res.json(product);
});

// POST new product — temporarily remove middlewares
router.post('/', (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new ValidationError('Product not found'));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new ValidationError('Product not found'));
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// STATS
router.get('/stats/summary', (req, res) => {
  const categories = {};
  products.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  res.json({ totalProducts: products.length, countByCategory: categories });
});

module.exports = router;
