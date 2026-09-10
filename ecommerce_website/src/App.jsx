import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'

import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Product from "./pages/Product"
import Checkout from "./pages/Checkout"
import { usePersistedState } from '/src/hooks/usePersistedState'

function App() {
  const [cart, updateCart] = usePersistedState('cart', {});

  // Callback Function
  const handleCartChange = (data) => {
      updateCart(data);
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/catalog">Catalog</Link> |{" "}
        <Link to="/product">Product</Link> |{" "}
        <Link to="/checkout">Checkout ({Object.keys(cart).length})</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={
          <Catalog parent_cart={cart} onCartChange={handleCartChange} />
        } />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
