import { Link } from 'react-router-dom';
import { useState } from 'react'

import { ICONS } from '/src/constants'

function ProductCard({
  product_id,
  name,
  img_path,
  cost,
  availability="In Stock",
  onCartChange
}) {
  const isAvailabilityVisible = 
    availability === "Out of Stock" || availability === "Preorder";
  const [cartIcon, setCartIcon] = useState(ICONS.CART);
  
  const handleAddToCart = (
    event,
    key,
    product_id,
    cost,
    img_path
  ) => {
    event.preventDefault();
    event.stopPropagation();

    onCartChange((prevCart) => ({
      ...prevCart,
      [key]: {
        'product_id': product_id,
        'quantity': prevCart[key] ? prevCart[key].quantity + 1 : 1,
        'cost': cost,
        'img_path': img_path,
      }
    }));
  };

  return (
    <Link
      to={`/product/${product_id}`}
      className="product-clickable-area"
    >
      <div className="product-card sm-card space-between">
        <div className="product-card-header">
          <div className="product-img-container small-img">
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
            className="icon clickable"
            src={cartIcon}
            alt="Add to Cart"
            onMouseEnter={() => setCartIcon(ICONS.ADD_TO_CART)}
            onMouseLeave={() => setCartIcon(ICONS.CART)}
            onClick={(event) => handleAddToCart(
              event, name, product_id, cost, img_path
            )}
          />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
