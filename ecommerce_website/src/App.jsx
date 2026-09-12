import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { calculateCartQuantity } from '/src/utils/Common.utils'

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
        <Link to="/checkout">Checkout ({calculateCartQuantity(cart)})</Link>
        <p>{JSON.stringify(cart)}</p>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
