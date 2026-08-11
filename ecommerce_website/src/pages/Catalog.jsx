import { useRef, useState } from 'react';
import { sort } from '../utils/Sorting.utils'

import products from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'

function Catalog() {
    const [sortMethod, setSortMethod] = useState("");

    // Callback Function
    const handleSortMethodChange = (data) => {
        setSortMethod(data);
    };

    // Load products
    let category = "Category 1"
    let products_set = [];

    // Filter products
    if (category === "All") {
        products_set = products.flatMap((entry) => entry.products ?? []);
    } else {
        const foundCategory = products.find((entry) => entry.category === category);
        products_set = foundCategory?.products ?? [];
    }

    // Sort products
    let sorted_products = sort(sortMethod, products_set)

    // Render page
    return (
        <>
        <h1>{category}</h1>
        <FilterBar
            numProducts={products_set.length}
            onDropDownSelect={handleSortMethodChange}
        />
        <p>{sortMethod}</p>
        <section id="center">
            <div>
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
        </section>
        </>
    )
}

export default Catalog