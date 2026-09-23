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
    const category_name = formatIdToName(category)
    const [quantity, setQuantity] = useState(1);
    const [cart, updateCart] = useState(parent_cart);

    // Callback Functions
    const handleQuantityChange = (data) => {
        setQuantity(data);
    };

    const handleAddToCart = (key, product_id, cost, img_path) => {
        onCartChange(prevCart => ({
        ...prevCart,
        [key]: {
            'product_id': product_id,
            'quantity': prevCart[key] ? prevCart[key].quantity + quantity : quantity,
            'cost': cost,
            'img_path': img_path,
        }
        }));
    };

    // Render page
    return (
        <div className="page">
            <div id="product-container">
                <div class="product-img-container large-img">
                    <img src={img_path} alt={name} />
                </div>
                <div
                    id="product-info-container"
                    className="flex-col"
                >
                    <div className="header flex-col align-txt-left">
                        <h1>{name}</h1>
                        <h2>${cost}</h2>
                    </div>
                    <div
                        id="product-description-container"
                        className="flex-col align-txt-left"
                    >
                        <h5>Product Description</h5>
                        <p className="align-txt-left">
                            {description}
                        </p>
                    </div>
                    <div id="product-btns-container">
                        <QuantityInput
                            label_text="Quantity"
                            onChangeValue={handleQuantityChange}
                        />
                        <button
                            className="primary-btn"
                            onClick={() => handleAddToCart(
                                name, product_id, cost, img_path
                            )}
                        >
                            <h3>Add to Cart</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product