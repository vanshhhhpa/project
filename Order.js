const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  stripeSessionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
