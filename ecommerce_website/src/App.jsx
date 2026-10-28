import './App.css'

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { calculateCartQuantity } from '/src/utils/Common.utils'

import Catalog from "./pages/Catalog"
import Product from "./pages/Product"
import Checkout from "./pages/Checkout"
import CartIcon from "./components/CartIcon"
import SearchBar from './components/SearchBar'
import { usePersistedState } from '/src/hooks/usePersistedState'

function App() {
  const [cart, updateCart] = usePersistedState('cart', {});
  const [searchTerm, setSearchTerm] = useState('');

  // Callback Function
  const handleCartChange = (data) => {
      updateCart(data);
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <nav id="nav-bar">
        <div className="right-side">
          <Link to="/catalog">
            Catalog
          </Link>
        </div>
        <SearchBar
          value={searchTerm}
          onSearchChange={setSearchTerm}
        />
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
              searchTerm={searchTerm}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App
