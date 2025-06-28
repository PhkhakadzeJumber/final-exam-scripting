import React, { useState } from 'react';
import { useCart } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';
import RightSide from './RightSide';
import '../styles/ShippingInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Price from './Price';

function Checkout() {

  const { shippingInfo, shippingMethod, getTotalUSD } = useCart();
  const navigate = useNavigate();

  const [fields, setFields] = useState({cardNumber: '', holder: '', expiry: '', cvv: ''});
  const [errors, setErrors] = useState({});

  const validate = (f) => {
    const errs = {};
    if (!f.cardNumber) errs.cardNumber = 'Card number required';
    else if (!/^\d{16}$/.test(f.cardNumber.replace(/\s/g, ''))) errs.cardNumber = 'Enter a valid 16-digit card number';
    if (!f.holder) errs.holder = 'Holder name required';
    if (!f.expiry) errs.expiry = 'Expiration required';
    else if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(f.expiry)) errs.expiry = 'MM/YY format required';
    if (!f.cvv) errs.cvv = 'CVV required';
    else if (!/^\d{3,4}$/.test(f.cvv)) errs.cvv = '3 or 4 digit CVV';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate('/success');
    }
  };

  return (

    <div className="shipping-info-container">
      <div className="shipping-info-form">
        <div className="shipping-method-progress">
          <span className="progress-link" onClick={() => navigate('/cart')}>Cart</span> {">"} <span className="progress-link" onClick={() => navigate('/shipping-info')}>Details</span> {">"} <span className="progress-link" onClick={() => navigate('/shipping-method')}>Shipping</span> {">"} <b>Payment</b>
        </div>
        <div className="shipping-method-summary-card" style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 8 }}>Contact <span style={{ color: '#222' }}>{shippingInfo.email}</span></div>
          <div style={{ marginBottom: 8 }}>Ship to <span style={{ color: '#222' }}>{shippingInfo.address}{shippingInfo.city ? `, ${shippingInfo.city}` : ''}{shippingInfo.postal ? `, ${shippingInfo.postal}` : ''}{shippingInfo.country ? `, ${shippingInfo.country}` : ''}</span></div>
          <div>Method <span style={{ color: '#222' }}>{shippingMethod === 'express' ? 'Express Shipping - 4.99$' : 'Standard Shipping - FREE'}</span></div>
        </div>
        <form className="checkout-payment-form" onSubmit={handleSubmit}>
          <div className="checkout-payment-title">Payment method</div>
          <div className="checkout-payment-card">
            <div className="checkout-payment-card-header">
              <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: 22 }} />
              <span className="checkout-payment-card-label">Credit Card</span>
            </div>
            <div className="checkout-payment-card-body">
              <div className="checkout-payment-fields">
                <div className="checkout-payment-input-row">
                  <input
                    className="checkout-payment-input"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={fields.cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                  />
                  <FontAwesomeIcon icon={faLock} className="checkout-payment-icon-right" />
                </div>
                {errors.cardNumber && <div className="shipping-error">{errors.cardNumber}</div>}
                <div className="checkout-payment-input-row">
                  <input className="checkout-payment-input" name="holder" placeholder="Holder Name" value={fields.holder} onChange={handleChange}/>
                </div>
                {errors.holder && <div className="shipping-error">{errors.holder}</div>}
                <div className="checkout-payment-input-row" style={{ display: 'flex', gap: 12 }}>
                  <input
                    className="checkout-payment-input"
                    name="expiry"
                    placeholder="Expiration (MM/YY)"
                    value={fields.expiry}
                    onChange={handleChange}
                    maxLength={5}
                    style={{ flex: 1 }}
                  />
                  <input
                    className="checkout-payment-input"
                    name="cvv"
                    placeholder="CVV"
                    value={fields.cvv}
                    onChange={handleChange}
                    maxLength={4}
                    style={{ flex: 1 }}
                  />
                  <FontAwesomeIcon icon={faInfoCircle} className="checkout-payment-icon-right" />
                </div>
                {errors.expiry && <div className="shipping-error">{errors.expiry}</div>}
                {errors.cvv && <div className="shipping-error">{errors.cvv}</div>}
              </div>
            </div>
          </div>
          <div className="shipping-actions">
            <span className="shipping-back" onClick={() => navigate('/shipping-method')}>Back to shipping</span>
            <button type="submit" className="shipping-continue" style={{ fontWeight: 600 }}>Pay now</button>
          </div>
        </form>
      </div>
      <RightSide 
        shippingLabel="Shipping"
        shippingValue={shippingMethod === 'express' ? <Price priceUSD={4.99}/> : <p>Free Shipping</p>}
        totalPrice={shippingMethod === 'express' ? getTotalUSD() + 4.99 : getTotalUSD()}
      />
    </div>

  );

}

export default Checkout