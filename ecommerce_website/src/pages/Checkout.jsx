import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { calculatePercentLeftForFreeShipping } from '/src/utils/Common.utils'

import { CHECKOUT_API_URL, ICONS } from '/src/constants'
import CartItem from '../components/CartItem'

function Checkout({parent_cart, onCartChange}) {
    useEffect(() => {
        document.title = 'My Closet- Checkout';
    }, []);

    // Load items from cart
    const [cart, updateCart] = useState(parent_cart);
    let subtotal = Object.values(cart).reduce((total, product) => total + (product.cost * product.quantity), 0);
    const amnt_to_qualify_for_free_shipping =  150.00;
    let amount_away_from_free_shipping = Math.max(0, amnt_to_qualify_for_free_shipping - subtotal);
    let percent_away_from_free_shipping = calculatePercentLeftForFreeShipping (
        amnt_to_qualify_for_free_shipping,
        subtotal
    );
    const shipping = percent_away_from_free_shipping >= 100 ? 0 : 15.00;
    let estimated_total = parseFloat(subtotal) + parseFloat(shipping);
    const [isOpen, setIsOpen] = useState(false);

    // Callback Functions
    const handleCartChange = (data) => {
        updateCart(data);
        onCartChange(data);
    };

    const items = Object.values(cart).map((product) => ({
        product_id: product.product_id,
        quantity: product.quantity,
    }));

    const handleCheckout = async () => {
        try {
            const response = await fetch(
                CHECKOUT_API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ items }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Checkout failed");
            }

            window.location.href = data.url;

        } catch (error) {
            console.error(error);
            alert(error.message || "Unable to start checkout.");
        }
    };

    const showCheckoutWarning = (value) => {
        setIsOpen(value);
    };

    // Render page
    if (subtotal > 0) {
        return (
            <div className="page">
                <h1 className="flex-col align-txt-left">Your Cart</h1>
                <div id="checkout-container">
                    <div id="checkout-product-grid">
                        {Object.entries(cart).map(([productName, product]) => (
                            <CartItem
                                product_id={product.product_id}
                                name={productName}
                                img_path={product.img_path}
                                cost={product.cost}
                                size={product.size}
                                category={product.category}
                                quantity={product.quantity}
                                onCartChange={handleCartChange}
                            />
                        ))}
                    </div>
                    <div className="right-side">
                        <div
                            id="free-shipping-container"
                            className="sm-margin-btm"
                        >
                            {percent_away_from_free_shipping < 100 ? (
                                <p>Only <b>${amount_away_from_free_shipping.toFixed(2)}</b> away from <b>FREE shipping!</b></p>
                            ) : (
                                <p>You qualify for <b>FREE shipping!</b></p>
                            )}
                            <div id="free-shipping-bar">
                                <div
                                    style={{  width: `${percent_away_from_free_shipping}%` }}
                                ></div>
                            </div>
                        </div>
                        <div
                            className="sm-margin-btm"
                            id="order-summary-container"
                        >
                            <h3 className="header flex-col align-txt-left">
                                Order Summary
                            </h3>
                            <div
                                id="cost-breakdown-container"
                                className="header"
                            >
                                <div className="space-between">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="space-between">
                                    <p>Shipping</p>
                                    <p>${shipping.toFixed(2)}</p>
                                </div>
                                <div className="space-between">
                                    <p>Tax</p>
                                    <p>TBA</p>
                                </div>
                            </div>
                            <div className="space-between">
                                <h3><strong>Estimated Total</strong></h3>
                                <h3><strong>${estimated_total.toFixed(2)}</strong></h3>
                            </div>
                        </div>
                        <button
                            className="primary-btn"
                            onClick={(event) => showCheckoutWarning(true)}
                        >
                            <h3>Checkout</h3>
                        </button>
                        <div className="modal-wrapper">
                            <div
                                className={isOpen === true ? "warning-modal is_open" : "warning-modal"}
                            >
                                <div>
                                    <h4
                                        id="close-icon"
                                        className="icon-hover"
                                        onClick={(event) => showCheckoutWarning(false)}
                                    >
                                        X
                                    </h4>
                                    <h2 className="header">Before You Checkout</h2>
                                </div>
                                <p>
                                    This is a portfolio project for demonstration purposes only
                                    <br/><br/>
                                    Do not enter your real credit card or personal information during checkout. 
                                    Use the test card information provided below
                                </p>
                                <table>
                                    <tr>
                                        <th><p><b>Card Number:</b></p></th>
                                        <td><p>4242 4242 4242 4242</p></td>
                                    </tr>
                                    <tr>
                                        <th><p><b>Expiry:</b></p></th>
                                        <td><p>12/34</p></td>
                                    </tr>
                                    <tr>
                                        <th><p><b>CVC:</b></p></th>
                                        <td><p>123</p></td>
                                    </tr>
                                </table>
                                <div className="button-container">
                                    <button
                                        className="secondary-btn"
                                        onClick={(event) => showCheckoutWarning(false)}
                                    >
                                        <h4>Close</h4>
                                    </button>
                                    <button
                                        className="primary-btn"
                                        onClick={handleCheckout}
                                    >
                                        <h4>Checkout</h4>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page">
                <div id="checkout-container">
                    <div id="empty-checkout" className="center">
                        <img
                            className="icon-big"
                            src={ICONS.CART}
                            alt="cart icon"
                        />
                        <p>Your Cart is Empty</p>
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
}

export default Checkout