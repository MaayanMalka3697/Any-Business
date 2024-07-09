const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Add Customer
router.post('/add', async (req, res) => {
  const { name, email, businessOwner } = req.body;
  try {
    const newCustomer = new Customer({ name, email, businessOwner });
    await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().populate('businessOwner');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Customer
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
