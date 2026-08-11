import { useState } from 'react'

function ProductCard({ name, img_path, cost, availability="In Stock", onClick }) {
  const isAvailabilityVisible = 
  availability === "Out of Stock" || availability === "Preorder";

  return (
    <div className="product-card">
      <div className="product-img-container">
        {isAvailabilityVisible && <p id="product-availability">{availability}</p>}
        <img src={img_path} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>${cost}</p>
    </div>
  );
}

export default ProductCard;
