import { useRef, useState } from 'react';

import products from '../assets/products.json'
import ProductCard from '../components/ProductCard'

function Catalog() {
    // Load products
    let category = "Category 1"
    let products_set = [];

    if (category === "All") {
        products_set = products.flatMap((entry) => entry.products ?? []);
    } else {
        const foundCategory = products.find((entry) => entry.category === category);
        products_set = foundCategory?.products ?? [];
    }

    // Render page
    return (
        <>
        <h1>{category}</h1>
        <section id="center">
            <div>
                {products_set.map((product) => (
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