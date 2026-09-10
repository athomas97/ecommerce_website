import { useState } from 'react'

function ProductCard({ name, img_path, cost, availability="In Stock", onClick }) {
  const isAvailabilityVisible = 
  availability === "Out of Stock" || availability === "Preorder";
  const [cartIcon, setCartIcon] = useState("/src/assets/icons/shopping-cart.png");

  return (
    <div className="product-card">
      <div className="product-clickable-area">
        <div className="product-img-container">
          {isAvailabilityVisible && <p id="product-availability">{availability}</p>}
          <img
            className="product-img"
            src={img_path}
            alt={name}
          />
        </div>
        {/* TODO: Clamp product name txt after 2 lines */}
        <h3>{name}</h3> 
      </div>
      <div className="product-info">
        <p>${cost}</p>
        <img
          // TODO: Add 'Add to cart tool tip when hovering'
          className="add-to-cart-btn"
          src={cartIcon}
          alt="Add to Cart"
          onMouseEnter={() => setCartIcon("/src/assets/icons/add-to-cart.png")}
          onMouseLeave={() => setCartIcon("/src/assets/icons/shopping-cart.png")}
        />
      </div>
    </div>
  );
}

export default ProductCard;
