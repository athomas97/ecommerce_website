import { useState } from 'react';
import { calculatePercentLeftForFreeShipping } from '/src/utils/Common.utils'

import CartItem from '../components/CartItem'

function Checkout({parent_cart, onCartChange}) {
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

    // Callback Functions
    const handleCartChange = (data) => {
        updateCart(data);
        onCartChange(data);
    };

    // Render page
    return (
        <div className="page">
            <h1>Your Cart</h1>
            <div className="checkout-container">
                <div className="checkout-grid">
                    {Object.entries(cart).map(([productName, product]) => (
                        <CartItem
                            product_id={product.product_id}
                            name={productName}
                            img_path={product.img_path}
                            cost={product.cost}
                            quantity={product.quantity}
                            onCartChange={handleCartChange}
                        />
                    ))}
                </div>
                <div id="checkout-right-container">
                    <div id="free-shipping-msg">
                        {percent_away_from_free_shipping < 100 ? (
                            <p>Only <b>${amount_away_from_free_shipping.toFixed(2)}</b> away from <b>FREE shipping!</b></p>
                        ) : (
                            <p>You qualify for free shipping!</p>
                        )}
                        <div id="free-shipping-bar">
                            <p
                                id="progress-bar"
                                style={{  width: `${percent_away_from_free_shipping}%` }}
                            >.</p>
                        </div>
                    </div>
                    <div id="order-summary">
                        <h3>Order Summary</h3>
                        <div id="order-summary-costs-container">
                            <div class="cost-container">
                                <p>Subtotal</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <div class="cost-container">
                                <p>Shipping</p>
                                <p>${shipping.toFixed(2)}</p>
                            </div>
                            <div class="cost-container">
                                <p>Tax</p>
                                <p>TBA</p>
                            </div>
                        </div>
                        <div class="cost-container">
                            <h3><strong>Estimated Total:</strong></h3>
                            <h3><strong>${estimated_total.toFixed(2)}</strong></h3>
                        </div>
                        <button id="proceed-to-cart-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout