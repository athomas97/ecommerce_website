import cartIcon from './assets/icons/shopping-cart.png'
import addToCartIcon from './assets/icons/add-to-cart.png'
import removeFromCartIcon from './assets/icons/remove.png'
import searchIcon from './assets/icons/search.png'
import noResultsIcon from './assets/icons/no-results.png'
import menuIcon from './assets/icons/menu.png'
import paymentVerifyingIcon from './assets/icons/payment-verifying.png'
import paymentSuccessIcon from './assets/icons/payment-success.png'
import paymentFailIcon from './assets/icons/payment-fail.png'
import logoPNG from './assets/img/logo.png'

export const LOGO = logoPNG
export const CHECKOUT_API_URL = "https://ecommerce-backend.ecommerce-website-backend.workers.dev"

export const ICONS = {
  CART: cartIcon,
  ADD_TO_CART: addToCartIcon,
  REMOVE_FROM_CART: removeFromCartIcon,
  SEARCH: searchIcon,
  MENU: menuIcon,
  PAYMENT_SUCCESS: paymentSuccessIcon,
  PAYMENT_FAIL: paymentFailIcon,
  PAYMENT_VERIFYING: paymentVerifyingIcon,
  NO_RESULTS: noResultsIcon,
}

export const SORT_BY = {
  NEWEST: "Newest",
  OLDEST: "Oldest",
  PRICE_LOW_TO_HIGH: "Price: Low to High",
  PRICE_HIGH_TO_LOW: "Price: High to Low",
}

export const AVAILABILITY = {
  IN_STOCK: "in-stock",
  OUT_OF_STOCK: "out-of-stock",
}

export const PRODUCT_CATEGORY = {
  TOPS: "tops",
  JACKETS: "jackets",
  PANTS: "pants",
  SKIRTS: "skirts",
}

export const CONFIRMATION_CONTENT = {
  verifying: {
    title: 'Verifying Payment...',
    message: 'Please wait while we confirm your payment with Stripe.',
    img: ICONS.PAYMENT_VERIFYING,
  },
  paid: {
    title: 'Order Confirmed!',
    message: 'Your payment has been confirmed.',
    img: ICONS.PAYMENT_SUCCESS,
  },
  'not-paid': {
    title: 'Payment Not Completed',
    message: 'Stripe has not confirmed payment. Your cart has not been cleared.',
    img: ICONS.PAYMENT_FAIL,
  },
  'missing-session': {
    title: 'Unable to Confirm Order',
    message: 'No checkout session was provided. Your cart has not been cleared.',
    img: ICONS.PAYMENT_FAIL,
  },
  error: {
    title: 'Unable to Confirm Order',
    message: 'We could not verify your payment with Stripe. Your cart has not been cleared.',
    img: ICONS.PAYMENT_FAIL,
  },
}