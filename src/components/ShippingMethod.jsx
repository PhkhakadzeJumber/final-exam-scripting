import React, { useState } from 'react';
import { useCart } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';
import Price from '../components/Price';
import RightSide from './RightSide';
import '../styles/ShippingInfo.css';

function ShippingMethod() {

  const { getTotalUSD, shippingInfo, shippingMethod, setShippingMethod } = useCart();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(shippingMethod || 'standard');

  const shippingOptions = [
    { key: 'standard', label: 'Standard Shipping', price: 0, desc: 'Free' },
    { key: 'express', label: 'Express Shipping', price: 4.99, desc: '4.99$' },
  ];

  const handleContinue = () => {
    setShippingMethod(selected);
    navigate('/checkout');
  };

  return (

    <div className="shipping-method-container">
      <div className="shipping-method-form">
        <div className="shipping-method-progress">
          <span className="shipping-method-link" onClick={() => navigate('/cart')}>Cart</span> {">"} <span className="shipping-method-link" onClick={() => navigate('/shipping-info')}>Details</span> {">"} <b>Shipping</b> {">"} Payment
        </div>
        <div className="shipping-method-summary-card">
          <div>Contact: <span style={{ color: '#222' }}>{shippingInfo.email}</span></div>
          <div>Ship to: <span style={{ color: '#222' }}>{shippingInfo.address}{shippingInfo.city ? `, ${shippingInfo.city}` : ''}{shippingInfo.postal ? `, ${shippingInfo.postal}` : ''}{shippingInfo.country ? `, ${shippingInfo.country}` : ''}</span></div>
        </div>
        <h2 className="shipping-method-title">Shipping method</h2>
        <form>
          {shippingOptions.map(opt => (
            <label key={opt.key} className={`shipping-method-option${selected === opt.key ? ' selected' : ''}`}>
              <input type="radio" name="shippingMethod" value={opt.key} checked={selected === opt.key} onChange={() => setSelected(opt.key)}/>
              <span className="shipping-method-label">{opt.label}</span>
              <span className="shipping-method-desc">{opt.desc}</span>
            </label>
          ))}
        </form>
        <div className="shipping-method-actions">
          <span className="shipping-method-back" onClick={() => navigate('/shipping-info')}>Back to details</span>
          <button className="shipping-method-continue" type="button" onClick={handleContinue}>Go to payment</button>
        </div>
      </div>
      
      <RightSide
        shippingLabel="Shipping"
        shippingValue={selected === 'standard' ? <p>Free Shipping</p> : <Price priceUSD={4.99}/>}
        totalPrice={getTotalUSD() + (selected === 'express' ? 4.99 : 0)}
      />
      
    </div>

  );

}

export default ShippingMethod