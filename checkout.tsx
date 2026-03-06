import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createCheckoutSession } from '../services/stripe';

const Checkout = () => {
    const router = useRouter();
    const { gigId } = router.query;
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const sessionId = await createCheckoutSession(gigId);
            const stripe = await import('@stripe/stripe-js');
            const { error } = await stripe.Stripe('YOUR_PUBLIC_STRIPE_KEY').redirectToCheckout({ sessionId });
            if (error) {
                console.error(error);
                alert('An error occurred during checkout. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <button onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default Checkout;