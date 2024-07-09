const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./config/passport'); // include the passport configuration

const app = express();

app.use(bodyParser.json());

app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Models
const BusinessOwner = require('./models/BusinessOwner');
const Customer = require('./models/Customer');
const Appointment = require('./models/Appointment');

// Routes
app.use('/api/business-owners', require('./routes/businessOwners'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
