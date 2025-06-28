import React from 'react';
import { useCart } from '../contexts/Context';
import Price from './Price';

function RightSide({ shippingLabel = 'Shipping', shippingValue = 'Calculated at the next step', totalPrice, isSuccess=false }) {
  
  const { cart, getTotalUSD } = useCart();

  return (
    
    <div className="shipping-info-summary">
      <div className="shipping-summary-items-list">
        {cart.map((item, idx) => (
          <div className="shipping-summary-item" key={idx}>
            <div className="shipping-summary-img-qty">
              <img src={item.product.images[0]} alt={item.product.name} className="shipping-summary-img" />
              <span className="shipping-summary-qty">{item.quantity}</span>
            </div>
            <div className="shipping-summary-name">{item.product.name}</div>
            <div className="shipping-summary-price"><Price priceUSD={item.product.price}/></div>
          </div>
        ))}
      </div>
      <div className="shipping-summary-totals">
        <div className="shipping-summary-row">
          <span>Subtotal</span>
          <Price priceUSD={getTotalUSD()}/>
        </div>
        <div className="shipping-summary-row">
          <span>{shippingLabel}</span>
          {shippingValue}
        </div>
        <div className="shipping-summary-row shipping-summary-total">
          <span className={isSuccess ? 'order-success-green' : ''}>{isSuccess ? "Paid" : "Total"}</span>
          <Price className={isSuccess ? 'order-success-green' : ''} priceUSD={typeof totalPrice === 'number' ? totalPrice : getTotalUSD()}/>
        </div>
      </div>
    </div>

  );

}

export default RightSide 