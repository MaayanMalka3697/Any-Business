const mongoose = require('mongoose');

const BusinessOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as necessary
});

module.exports = mongoose.model('BusinessOwner', BusinessOwnerSchema);
