import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CHECKOUT_API_URL, CONFIRMATION_CONTENT } from '/src/constants'

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

    const confirmationContent = CONFIRMATION_CONTENT[verificationStatus];

    useEffect(() => {
        document.title = `My Closet - ${confirmationContent.title}`;
    }, [confirmationContent.title]);

    return (
        <div className="page">
            <div id="checkout-container">
                <div id="empty-checkout" className="center">
                    <img
                        className="icon-big"
                        src={confirmationContent.img}
                    />
                    <div>
                        <h2>{confirmationContent.title}</h2>
                        <p>{confirmationContent.message}</p>
                    </div>
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