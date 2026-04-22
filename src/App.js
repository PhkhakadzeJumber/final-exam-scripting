import { Route, Routes, Navigate } from 'react-router-dom';
import './styles/common.css';
import ProductList from './components/HomePage';
import ProductDetail from './components/DetailsPage';
import Cart from './components/CartPage';
import ShippingInfo from './components/ShippingInfo';
import ShippingMethod from './components/ShippingMethod';
import Checkout from './components/Checkout';
import Success from './components/Success';
import { CartProvider } from './contexts/Context';

function App() {

  return (

    <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/category/man" replace />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/shipping-method" element={<ShippingMethod />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />

        <Route path="/category/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </CartProvider>

  );
  
}

export default App;