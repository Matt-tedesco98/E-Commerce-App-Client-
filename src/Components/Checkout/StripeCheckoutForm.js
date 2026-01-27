import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';


const API = 'http://localhost:4000/api'

export default function StripeCheckoutForm({user, total}) {
const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !user) return;

        setProcessing(true);
        setError('');
        setSuccess(false);

        try {
            const intentRes = await fetch(`${API}/payments/create-payment-intent/${user.userid}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (!intentRes.ok) throw new Error('Failed to create payment intent');

            const {clientSecret} = await intentRes.json();

            const cardElement = elements.getElement(CardElement)

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            if (result.paymentIntent.status === 'succeeded') {
                const checkoutRes = await fetch(`${API}/cart/${user.userid}/checkout`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!checkoutRes.ok) throw new Error('Failed to checkout');

                const data = await checkoutRes.json();
                console.log("data:", data);
                navigate(`/orders/${data.orderId}`);

                setSuccess(true);
            }
        } catch (err) {
            setError(err.message || 'Failed to complete payment');
        } finally {
            setProcessing(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <CardElement className='stripe-card-element'/>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Payment successful! Redirecting...</p>}
            <button type="submit" disabled={!stripe || processing}>
                {processing ? 'Processing...' : 'Pay $' + Number(total)}
            </button>
        </form>
    );
}
