import { ICONS } from '/src/constants'

function CartIcon({quantity}) {
  return (
    <div id="cart-icon">
        <p><b>{quantity}</b></p>
        <img
            className="icon clickable"
            src={ICONS.CART}
            alt="cart icon"
        />
    </div>
  );
}

export default CartIcon;
