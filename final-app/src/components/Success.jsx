import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/ShippingInfo.css';
import Price from './Price';
import RightSide from './RightSide';

function Success() {

  const navigate = useNavigate();
  const { shippingMethod, getTotalUSD } = useCart();
  const orderNum =2000 + Math.floor(Math.random() * 1000);

  return (

    <div className="shipping-info-container">
      <div className="shipping-info-form success-form">
        <div className="shipping-method-progress success-progress">
          <span className="progress-link" onClick={() => navigate('/cart')}>Cart</span> {'>'} <span className="progress-link" onClick={() => navigate('/shipping-info')}>Details</span> {'>'} <span className="progress-link" onClick={() => navigate('/shipping-method')}>Shipping</span> {'>'} <b>Payment</b>
        </div>
        <FontAwesomeIcon icon={faCheckCircle} className="success-check-icon" />
        <div className="success-headline">Payment Confirmed</div>
        <div className="success-order-num">ORDER #{orderNum}</div>
        <button className="shipping-continue success-back-btn" onClick={() => navigate('/')}>
          Back to shopping
        </button>
      </div>
      <RightSide
        shippingLabel="Shipping"
        shippingValue={shippingMethod === 'express' ? <Price priceUSD={4.99}/> : <p>Free Shipping</p>}
        totalPrice={shippingMethod === 'express' ? getTotalUSD() + 4.99 : getTotalUSD()}
        isSuccess={true}
      />
    </div>

  );

}

export default Success