import { useState } from 'react';

function QuantityInput({
    label_text,
    default_quantity=1,
    onChangeValue,
}) {
    const [quantity, setQuantity] = useState(default_quantity);

    // Callback function
    const increaseQuantity = () => {
        const nextQuantity = quantity + 1;
        setQuantity(nextQuantity);
        onChangeValue(nextQuantity);
    };

    const decreaseQuantity = () => {
        const nextQuantity = Math.max(1, quantity - 1);
        setQuantity(nextQuantity);
        onChangeValue(nextQuantity);
    };

    return (
        <div class="quantity-input-container">
            <button
                onClick={() => decreaseQuantity()}
                style={{
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                }}
            >
                -
            </button>
            <div id="quantity-input">
                <p className="label-txt">{label_text}</p>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    disabled
                />
            </div>
            <button
                onClick={() => increaseQuantity()}
                style={{
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                }}
            >
                +
            </button>
        </div>
    );
}

export default QuantityInput;
