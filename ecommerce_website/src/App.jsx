import './App.css'

import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { calculateCartQuantity } from '/src/utils/Common.utils'
import { LOGO, ICONS } from '/src/constants'

import Catalog from "./pages/Catalog"
import Product from "./pages/Product"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import CartIcon from "./components/CartIcon"
import SearchBar from './components/SearchBar'
import { usePersistedState } from '/src/hooks/usePersistedState'

function App() {
  const [cart, updateCart] = usePersistedState('cart', {});
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Callback Function
  const handleCartChange = useCallback((data) => {
    updateCart(data);
  }, [updateCart]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <nav id="nav-bar" className={mobileSearchOpen ? 'mobile-search-open' : ''}>
        <div className="right-side">
          <Link to="/catalog">
            <img id="logo" src={LOGO} alt="My Closet"/>
          </Link>
        </div>
        <button
          className="mobile-search-toggle"
          type="button"
          aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
          aria-expanded={mobileSearchOpen}
          aria-controls="search-bar"
          onClick={() => setMobileSearchOpen((isOpen) => !isOpen)}
        >
          <img className="icon" src={ICONS.SEARCH} alt="" />
        </button>
        <SearchBar onSearch={() => setMobileSearchOpen(false)} />
        <Link to="/checkout">
          <CartIcon quantity={calculateCartQuantity(cart)}/>
        </Link>
        {/* <p>{JSON.stringify(cart)}</p> */}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route
          path="/catalog"
          element={
            <Catalog
              parent_cart={cart} 
              onCartChange={handleCartChange}
            />
          }
        />
        <Route
          path="/product/:product_id"
          element={
            <Product
              parent_cart={cart} 
              onCartChange={handleCartChange}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              parent_cart={cart} 
              onCartChange={handleCartChange}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmation onCartChange={handleCartChange} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
