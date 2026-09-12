import { useState } from 'react';
import { sort } from '../utils/Sorting.utils'
import { filter } from '../utils/Filter.utils'
import { createFilters } from '../utils/Common.utils'
import { AVAILABILITY, PRODUCT_CATEGORY } from '../constants'

import products from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import SortBar from '../components/SortBar'
import FilterBar from '../components/FilterBar'

function Catalog({parent_cart, onCartChange}) {
    const [sortMethod, setSortMethod] = useState("");
    const [filters, setFilters] = useState({
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
    const handleSortMethodChange = (data) => {
        setSortMethod(data);
    };
    const handleFilterChange = (data) => {
        setFilters((prevFilters) => {
            const nextFilters = {
                ...prevFilters,
                ...data,
            };
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
    let sorted_products = sort(sortMethod, products_set)

    // Render page
    return (
        <div className="page">
            <SortBar
                numProducts={products_set.length}
                onDropDownSelect={handleSortMethodChange}
            />
            <div id="catalog-pg-content">
                <FilterBar
                    className="sticky"
                    numProducts={products_set.length}
                    onFilterChange={handleFilterChange}
                    onDropDownSelect={handleSortMethodChange}
                />
                <div className="flex-col center">
                <div className="product-grid">
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