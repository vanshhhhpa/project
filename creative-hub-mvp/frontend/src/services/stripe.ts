import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (lineItems) => {
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line_items: lineItems }),
    });

    const session = await response.json();

    if (response.ok) {
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            console.error(result.error.message);
        }
    } else {
        console.error(session.error);
    }
};