const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BusinessOwner = require('../models/BusinessOwner');

// Add Business Owner
router.post('/add', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newBusinessOwner = new BusinessOwner({ name, email, password: hashedPassword });
    await newBusinessOwner.save();
    res.json(newBusinessOwner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Business Owners
router.get('/', async (req, res) => {
  try {
    const businessOwners = await BusinessOwner.find();
    res.json(businessOwners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Business Owner
router.put('/:id', async (req, res) => {
  try {
    const updatedBusinessOwner = await BusinessOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBusinessOwner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Business Owner
router.delete('/:id', async (req, res) => {
  try {
    await BusinessOwner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Business Owner deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
