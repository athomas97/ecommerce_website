import { useRef, useState } from 'react';
import { sort } from '../utils/Sorting.utils'
import { filter } from '../utils/Filter.utils'

import products from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import FilterSideBar from '../components/FilterSideBar'

function Catalog() {
    const [sortMethod, setSortMethod] = useState("");
    const [filters, setFilters] = useState({
        "availability": {
            "in-stock": false,
            "out-of-stock": false,
            "preorder": false
        },
        "price": {
            "min": '',
            "max": '' 
        },
        "category": {
            "category-1": false,
            "category-2": false,
        }
    });

    // Callback Function
    const handleSortMethodChange = (data) => {
        setSortMethod(data);
    };
    const handleFilterChange = (data) => {
        setFilters((prevFilters) => {
            const nextFilters = {
                ...prevFilters,
                ...data,
            };
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
            {/* TODO: Change FilterBar -> SortBar */}
            {/* TODO: Change FilterSideBar -> FilterBar */}
            <FilterBar
                numProducts={products_set.length}
                onFilterChange={handleFilterChange}
                onDropDownSelect={handleSortMethodChange}
            />
            <div id="catalog-pg-content">
                <FilterSideBar
                    className="sticky"
                    numProducts={products_set.length}
                    onFilterChange={handleFilterChange}
                    onDropDownSelect={handleSortMethodChange}
                />
                <div id="center">
                <div className="product-grid">
                    {sorted_products.map((product) => (
                        <ProductCard
                            key={product.name}
                            name={product.name}
                            img_path={product.img_path}
                            cost={product.cost}
                            availability={product.availability}
                        />
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog