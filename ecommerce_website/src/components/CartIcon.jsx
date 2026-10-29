import { ICONS } from '/src/constants'

function CartIcon({quantity}) {
  return (
    <div className="icon-hover cart-icon">
        <p class="cart-tag"><b>{quantity}</b></p>
        <img
            className="icon clickable"
            src={ICONS.CART}
            alt="cart icon"
        />
    </div>
  );
}

export default CartIcon;
