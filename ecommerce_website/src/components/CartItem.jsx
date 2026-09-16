import { Link } from 'react-router-dom';

import QuantityInput from '/src/components/QuantityInput'

function CartItem({
    product_id,
    name,
    img_path,
    cost,
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
        className="product-card"
        style={{ display: 'flex', gap: '20px' }}
    >
        <div className="product-img-container">
            <img
                className="product-img"
                src={img_path}
                alt={name}
            />
        </div>
        <div
            style={{ justifyContent: 'space-between', height: '100%', width: '100%' }}
            className="flex-col"
        >
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{  width: '100%' }}>
                    <Link
                        to={`/product/${product_id}`}
                        className="product-clickable-area"
                        style={{ textDecoration: 'none' }}
                    >
                        <h2>{name}</h2>
                    </Link>
                    <p>Catagory</p>
                </div>
                <h2>${(cost*quantity).toFixed(2)}</h2>
            </div>
            <div
                style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%' }}
            >
                <QuantityInput
                    label_text="Quantity"
                    default_quantity={quantity}
                    update_cart={true}
                    onChangeValue={handleQuantityChange}
                />
                <p
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
