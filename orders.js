const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get orders for client
router.get('/me', auth, async (req, res) => {
  try {
    const orders = await Order.find({ clientId: req.user._id }).populate('gigId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
