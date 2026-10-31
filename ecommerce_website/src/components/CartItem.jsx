import { Link } from 'react-router-dom';

import QuantityInput from '/src/components/QuantityInput'
import { formatIdToName } from '/src/utils/Common.utils'
import { getProductImageUrl } from '../utils/assetUrl'

function CartItem({
    product_id,
    name,
    img_path,
    cost,
    size,
    category,
    quantity,
    onCartChange
}) {
    // Callback Functions
    const handleRemoveFromCart = (key) => {
        onCartChange(prevCart => {
        if (!prevCart[key]) {
            return prevCart;
        }
        const { [key]: omitted, ...rest } = prevCart;
        return rest;
        });
    };
    const handleQuantityChange = (newQuantity) => {
    onCartChange((prevCart) => ({
        ...prevCart,
        [name]: {
        ...prevCart[name],
        quantity: newQuantity,
        },
    }));
    };

  return (
    <div
        className="product-card cart-container-grid"
        id="cart-item"
    >
        <Link
            to={`/product/${product_id}`}
            className="product-clickable-area product-img-container"
        >
            <img
                src={getProductImageUrl(img_path)}
                alt={name}
            />
        </Link>
        <div className="flex-col product-info-checkout">
            <div>
                <div>
                    <Link
                        to={`/product/${product_id}`}
                        className="product-clickable-area"
                        style={{ textDecoration: 'none' }}
                    >
                        <h3><b>{name}</b></h3>
                    </Link>
                    <p>Size {size} • {formatIdToName(category)}</p>
                </div>
                <h4><b>${(cost*quantity).toFixed(2)}</b></h4>
            </div>
            <div>
                <QuantityInput
                    label_text="Quantity"
                    default_quantity={quantity}
                    update_cart={true}
                    onChangeValue={handleQuantityChange}
                />
                <p
                    id="remove-text"
                    className="product-clickable-area"
                    onClick={() => handleRemoveFromCart(name)}
                >
                    Remove
                </p>
            </div>
        </div>
    </div>
  );
}

export default CartItem;
