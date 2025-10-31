const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample data
let products = [
  {
    id: uuidv4(),
    name: 'Sample Product',
    description: 'A sample product',
    price: 10.99,
    category: 'General',
    inStock: true,
  },
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
