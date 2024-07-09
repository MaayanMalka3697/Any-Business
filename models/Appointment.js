const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  businessOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessOwner', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  date: { type: Date, required: true },
  // Add other fields as necessary
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
