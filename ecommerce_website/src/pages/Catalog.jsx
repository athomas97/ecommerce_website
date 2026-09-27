import { useState } from 'react';
import { sort } from '../utils/Sorting.utils'
import { filter } from '../utils/Filter.utils'
import { createFilters } from '../utils/Common.utils'
import { SORT_BY, AVAILABILITY, PRODUCT_CATEGORY } from '../constants'

import products from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'

function Catalog({parent_cart, onCartChange}) {
    const [filters, setFilters] = useState({
        "sort_by": Object.values(SORT_BY)[0],
        "availability": createFilters(AVAILABILITY),
        "price": {
            "min": '',
            "max": '' 
        },
        "category": createFilters(PRODUCT_CATEGORY),
    });
    const [cart, updateCart] = useState(parent_cart);

    // Callback Functions
    const handleCartChange = (data) => {
        updateCart(data);
        onCartChange(data);
    };
    const handleFilterChange = (data) => {
        setFilters((prevFilters) => {
            const nextFilters = {
                ...prevFilters,
                ...data,
            };
            if (data.sort_by) {
                nextFilters.sort_by = data.sort_by;
            }
            // TODO: Handles errors if availability is not a valid type
            if (data.availability) {
                nextFilters.availability = {
                ...prevFilters.availability,
                ...data.availability,
                };
            }
            if (data.price) {
                nextFilters.price = {
                ...prevFilters.price,
                ...data.price,
                };
            }
            // TODO: Handles errors if category is not a valid type
            if (data.category) {
                nextFilters.category = {
                    ...prevFilters.category,
                    ...data.category,
                };
            }
            return nextFilters;
        });
    };

    // Filter products
    let products_set = filter(filters, products)

    // Sort products
    let sorted_products = sort(filters.sort_by, products_set)

    // Render page
    return (
        <div className="page">
            <h1 className="header flex-col align-txt-left">Catalog</h1>
            <div id="catalog-container">
                <div id="catalog-container-child">
                    <FilterBar
                        numProducts={products_set.length}
                        onFilterChange={handleFilterChange}
                    />
                    <div id="catalog-product-grid">
                        {sorted_products.map((product) => (
                            <ProductCard
                                product_id={product.product_id}
                                key={product.name}
                                name={product.name}
                                img_path={product.img_path}
                                cost={product.cost}
                                availability={product.availability}
                                onCartChange={handleCartChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog