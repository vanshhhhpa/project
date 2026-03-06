const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// NOTE: don't use bodyParser.raw globally — it breaks JSON parsing for all routes.
// Use route-level raw parsing for Stripe webhooks in `routes/stripe.js` instead.

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/creativehub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Mongo connected')).catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gigs', require('./routes/gigs'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/stripe', require('./routes/stripe'));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
