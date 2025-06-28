import React from 'react';
import { useCart } from '../contexts/Context';
import '../styles/CartPage.css';
import { useNavigate } from 'react-router-dom';
import Price from './Price';
import Navbar from './Navbar';

function CartPage() {
  
  const { cart, setCart, getTotalUSD } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (ind, changeAmount) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map((item, i) =>
        i === ind ? { ...item, quantity: item.quantity + changeAmount } : item
      );
      return updatedCart.filter(item => item.quantity > 0); // if 0 remove from cart
    });
  };

  const handleImageNav = (idx, dir) => {
    setCart(prevCart => prevCart.map((item, i) => {
      if(i !== idx) 
        return item;
      
      const len = item.product.images.length;
      let newIdx = item.imageIdx + dir;
      
      if(newIdx < 0) 
        newIdx = len - 1;
      if(newIdx >= len) 
        newIdx = 0;
      
      return { ...item, imageIdx: newIdx };
    }));
  };

  const handleSizeChange = (ind, newSize) => {
    setCart(prevCart => prevCart.map((item, i) =>
      i === ind ? { ...item, size: newSize } : item
    ));
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleContinue = () => {
    navigate('/shipping-info');
  };

  return (

    <div>
        <Navbar/>
        <div className="cart-container">
          <h1 className="cart-title">CART</h1>
          <div className="cart-list">
            {cart.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <div className="cart-item-info">
                  <div className="cart-item-brand">{item.product.brand}</div>
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-price">
                    <Price priceUSD={item.product.price}/>
                  </div>
                  <div className="cart-item-sizes">
                    <div className="label">SIZE:</div>
                    <div className="sizes-list">
                      {item.product.sizes.map(size => (
                        <button className={`size-btn${item.size === size ? ' selected' : ''}`} onClick={() => handleSizeChange(idx, size)}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => handleQuantityChange(idx, 1)}>+</button>
                  <div className="cart-item-quantity">{item.quantity}</div>
                  <button className="quantity-btn" onClick={() => handleQuantityChange(idx, -1)}>-</button>
                </div>
                <div className="cart-item-image-list">
                  <img
                    src={item.product.images[item.imageIdx]}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  {item.product.images.length > 1 && (
                    <div className="carousel-nav">
                      <button onClick={() => handleImageNav(idx, -1)}>{'<'}</button>
                      <button onClick={() => handleImageNav(idx, 1)}>{'>'}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div> Quantity: <span className="cart-summary-value">{totalQuantity}</span> </div>
            <div> Total: <Price priceUSD={getTotalUSD()}/> </div>
            <button className="cart-continue-btn" onClick={handleContinue}>CONTINUE</button>
          </div>
      </div>
    </div> 

  );

}

export default CartPage