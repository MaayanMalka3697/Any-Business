const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Add Appointment
router.post('/add', async (req, res) => {
  const { businessOwner, customer, date } = req.body;
  try {
    const newAppointment = new Appointment({ businessOwner, customer, date });
    await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('businessOwner customer');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
