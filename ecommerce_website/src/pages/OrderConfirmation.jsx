import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CHECKOUT_API_URL, ICONS } from '/src/constants'

function OrderConfirmation({ onCartChange }) {
    const [searchParams] = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        let isCurrent = true;

        const verifyPayment = async () => {
            if (!sessionId) {
                setVerificationStatus('missing-session');
                return;
            }

            try {
                const response = await fetch(CHECKOUT_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                });
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Unable to verify payment.');
                }

                if (!isCurrent) {
                    return;
                }

                if (result.paid) {
                    onCartChange({});
                    setVerificationStatus('paid');
                } else {
                    setVerificationStatus('not-paid');
                }
            } catch (error) {
                console.error('Payment verification failed:', error);
                if (isCurrent) {
                    setVerificationStatus('error');
                }
            }
        };

        verifyPayment();

        return () => {
            isCurrent = false;
        };
    }, [sessionId, onCartChange]);

    const confirmationContent = {
        verifying: {
            title: 'Verifying Payment...',
            message: 'Please wait while we confirm your payment with Stripe.',
        },
        paid: {
            title: 'Order Confirmed!',
            message: 'Your payment has been confirmed.',
        },
        'not-paid': {
            title: 'Payment Not Completed',
            message: 'Stripe has not confirmed payment. Your cart has not been cleared.',
        },
        'missing-session': {
            title: 'Unable to Confirm Order',
            message: 'No checkout session was provided. Your cart has not been cleared.',
        },
        error: {
            title: 'Unable to Confirm Order',
            message: 'We could not verify your payment with Stripe. Your cart has not been cleared.',
        },
    }[verificationStatus];

    return (
        <div className="page">
            <div id="checkout-container">
                <div id="empty-checkout" className="center">
                    <img
                        className="icon-big"
                        src={ICONS.CART}
                        alt="cart icon"
                    />
                    <h1>{confirmationContent.title}</h1>
                    <p>{confirmationContent.message}</p>
                    <Link to="/catalog">
                        <button className="secondary-btn">
                            <h3>Continue Shopping</h3>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation