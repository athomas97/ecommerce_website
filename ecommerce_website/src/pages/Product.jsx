import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { filterByProductId } from '../utils/Filter.utils'
import { formatIdToName } from '/src/utils/Common.utils'

import products from '../assets/products.json'
import QuantityInput from '/src/components/QuantityInput'

function Product({parent_cart, onCartChange}) {
    // Get product from json file
    const { product_id } = useParams();
    const { product, category } = filterByProductId(
        Number(product_id), products
    );

    // Set Variables
    const name = product.name
    const cost = product.cost
    const description = product.description
    const img_path = product.img_path
    const catagory = formatIdToName(category)
    const [quantity, setQuantity] = useState(1);
    const [cart, updateCart] = useState(parent_cart);

    // Callback Functions
    const handleQuantityChange = (data) => {
        setQuantity(data);
    };

    const handleAddToCart = (key, cost) => {
        onCartChange(prevCart => ({
        ...prevCart,
        [key]: {
            quantity: prevCart[key] ? prevCart[key].quantity + quantity : quantity,
            'cost': cost,
        }
        }));
    };

    // Render page
    return (
        <div id="product-container">
            <img
                className="product-img"
                src={img_path}
                alt={name}
            />
            <div
                id="product-info-container"
                className="flex-col"
            >
                <h1>{name}</h1>
                <h3>{catagory}</h3>
                <h2>${cost}</h2>
                <p className="description_txt">{description}</p>
                <div id="product-btns-container">
                    <QuantityInput
                        label_text="Quantity"
                        onChangeValue={handleQuantityChange}
                    />
                    <button
                        id="add-to-cart-btn"
                        onClick={() => handleAddToCart(name, cost)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product