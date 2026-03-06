const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Gig = require('../models/Gig');
const Order = require('../models/Order');

const stripe = Stripe(process.env.STRIPE_SECRET);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { gigId } = req.body;
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: gig.title, description: gig.description },
            unit_amount: Math.round(gig.price * 100)
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5000'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5000'}/cancel.html`,
      metadata: { gigId }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Stripe error' });
  }
});

// Webhook to capture completed payments and create order
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = req.body;
    }
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      // metadata contains gigId
      const gigId = session.metadata && session.metadata.gigId;
      const clientEmail = session.customer_details && session.customer_details.email;
      // Create order with pending client id (if you want to map client id, collect it in metadata when creating session)
      await Order.create({ gigId, stripeSessionId: session.id, paymentStatus: 'paid', clientId: null });
    } catch (err) {
      console.error('Failed to create order', err);
    }
  }

  res.json({ received: true });
});

module.exports = router;
