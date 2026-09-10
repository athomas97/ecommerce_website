import { useState, useEffect } from 'react'

import { ICONS } from '/src/constants'

function ProductCard({
  name,
  img_path,
  cost,
  parent_cart,
  availability="In Stock",
  onClick,
  onCartChange
}) {
  const isAvailabilityVisible = 
  availability === "Out of Stock" || availability === "Preorder";
  const [cartIcon, setCartIcon] = useState(ICONS.CART);
  const [cart, updateCart] = useState(parent_cart);
  
  const handleAddToCart = (key, cost) => {
    onCartChange(prevCart => ({
      ...prevCart,
      [key]: {
        quantity: prevCart[key] ? prevCart[key].quantity + 1 : 1,
        'cost': cost,
      }
    }));
  };

  const handleRemoveFromCart = (key) => {
    onCartChange(prevCart => {
      if (!prevCart[key]) {
        return prevCart;
      }
      const newQuantity = prevCart[key].quantity - 1;
      if (newQuantity <= 0) {
        const { [key]: omitted, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [key]: {
          ...prevCart[key],
          quantity: newQuantity
        }
      };
    });
  };

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
          className="add-to-cart-btn"
          src={cartIcon}
          alt="Add to Cart"
          onMouseEnter={() => setCartIcon(ICONS.ADD_TO_CART)}
          onMouseLeave={() => setCartIcon(ICONS.CART)}
          onClick={() => handleAddToCart(name, cost)}
        />
        <img
          className="remove-btn"
          src={ICONS.REMOVE_FROM_CART}
          alt="Remove from Cart"
          onClick={() => handleRemoveFromCart(name)}
        />
      </div>
    </div>
  );
}

export default ProductCard;
