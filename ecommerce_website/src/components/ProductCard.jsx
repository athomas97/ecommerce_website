import { Link } from 'react-router-dom';
import { useState } from 'react'

import { ICONS, SPARKLE } from '/src/constants'
import { getProductImageUrl } from '../utils/assetUrl'

function ProductCard({
  product_id,
  name,
  img_path,
  size,
  cost,
  availability="In Stock",
  onCartChange
}) {
  const isAvailabilityVisible =  availability === "Out of Stock";
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
        <div className="product-img-container small-img">
          {isAvailabilityVisible && <h5 id="product-availability">{availability}</h5>}
          <img
            className="sparkle-top-left"
            src={SPARKLE}
            alt={name}
          />
          <img
            className="sparkle-bottom-right"
            src={SPARKLE}
            alt={name}
          />
          <img
            className={availability === "Out of Stock" ? "product-img sold-out" : "product-img"}
            src={getProductImageUrl(img_path)}
            alt={name}
          />
        </div>
        {/* TODO: Clamp product name txt after 2 lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: '100%' }}>
          <div>
            <h3 className="product-title">{name}</h3>
            <p>Size {size} </p>
          </div>
          <div className="product-info">
            <h4>${cost}</h4>
            <div style={{ position: 'relative' }} className="icon-hover">
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
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
