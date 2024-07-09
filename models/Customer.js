const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  businessOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessOwner' },
  // Add other fields as necessary
});

module.exports = mongoose.model('Customer', CustomerSchema);
