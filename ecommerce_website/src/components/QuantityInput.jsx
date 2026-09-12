import { useState } from 'react';

function QuantityInput({
    label_text,
    onChangeValue
}) {
    const [quantity, setQuantity] = useState(1);

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
        <div className="flex">
            <div
                id="quantity-input-container"
                className="flex-col"
            >
                <label
                    htmlFor="quantity"
                >
                    {label_text}
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    disabled
                />
            </div>
            <div className="flex-col">
                <button
                    onClick={() => increaseQuantity()}
                >
                    +
                </button>
                <button
                    onClick={() => decreaseQuantity()}
                >
                    -
                </button>
            </div>
        </div>
    );
}

export default QuantityInput;
