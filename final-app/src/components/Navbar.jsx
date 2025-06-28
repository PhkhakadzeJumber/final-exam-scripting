import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../contexts/Context';
import MiniCart from './MiniCart';

function Navbar() {

  const { cart, currency, setCurrency, isMiniCartOpen, setIsMiniCartOpen } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const toggleMiniCart = () => {
    setIsMiniCartOpen(prev => !prev);
  };

  const closeMiniCart = () => {
    setIsMiniCartOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="categories">
          <NavLink to="/category/woman" className={({ isActive }) => isActive ? "category-link active-link" : "category-link"}>
            WOMEN
          </NavLink>
          <NavLink to="/category/man" className={({ isActive }) => isActive ? "category-link active-link" : "category-link"}>
            MEN
          </NavLink>
          <NavLink to="/category/kids" className={({ isActive }) => isActive ? "category-link active-link" : "category-link"}>
            KIDS
          </NavLink>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <div className="logo-square">
            <FontAwesomeIcon icon={faShoppingBag} className="logo-icon" />
          </div>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="currency-dropdown-wrapper">
          <select name="currency" value={currency} onChange={handleCurrencyChange} className="currency-dropdown">
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="¥">¥ JPY</option>
          </select>
        </div>
        <div className="cart-icon-container" onClick={toggleMiniCart}>
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItemCount > 0 && (<span className="cart-item-count-circle">{cartItemCount}</span>)}
        </div>
        {isMiniCartOpen && <MiniCart onClose={closeMiniCart} />}
      </div>
    </nav>
  );

}

export default Navbar