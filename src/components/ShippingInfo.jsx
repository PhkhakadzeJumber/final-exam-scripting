import React, { useState } from 'react';
import { useCart } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';
import '../styles/ShippingInfo.css';
import RightSide from './RightSide';

function ShippingInfo() {

  const { shippingInfo, setShippingInfo } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = (fields) => {
    const errs = {};
    if(!fields.email) 
      errs.email = 'Email is required';
    else if(!/^\S+@\S+\.\S+$/.test(fields.email) && !/^\+?\d{7,15}$/.test(fields.email)) 
      errs.email = 'Enter a valid email or phone number';

    if(!fields.name) errs.name = 'Name is required';
    if(!fields.secondName) errs.secondName = 'Second name is required';
    if(!fields.address) errs.address = 'Address is required';
    if(!fields.city) errs.city = 'City is required';
    if(!fields.postal) 
      errs.postal = 'Postal code is required';
    else if(!/^\d{4,10}$/.test(fields.postal)) 
      errs.postal = 'Enter a valid postal code';
    
    if(!fields.province) errs.province = 'Province is required';
    if(!fields.country) errs.country = 'Country is required';

    return errs;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setShippingInfo(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(shippingInfo);
    setErrors(errs);
    if(Object.keys(errs).length === 0) 
      navigate('/shipping-method');
  };

  return (

    <div className="shipping-info-container">
      <div className="shipping-info-form">
        <div>
          <span className="progress-link" onClick={() => navigate('/cart')}>Cart</span> {">"} <b>Details</b> {">"} Shipping {">"} Payment
        </div>

        <h2>Contact</h2>

        <input
          type="email"
          name="email"
          placeholder="Email or mobile phone number"
          value={shippingInfo.email || ''}
          onChange={handleChange}
          className="shipping-input"
        />
        {errors.email && <div className="shipping-error">{errors.email}</div>}

        <h2>Shipping Address</h2>

        <form onSubmit={handleSubmit}>
          <div className="shipping-row">
            <input name="name" placeholder="Name" value={shippingInfo.name || ''} onChange={handleChange} className="shipping-input" />
            <input name="secondName" placeholder="Second Name" value={shippingInfo.secondName || ''} onChange={handleChange} className="shipping-input" />
          </div>

          {errors.name && <div className="shipping-error">{errors.name}</div>}
          {errors.secondName && <div className="shipping-error">{errors.secondName}</div>}
          
          <input name="address" placeholder="Address and number" value={shippingInfo.address || ''} onChange={handleChange} className="shipping-input" />
          {errors.address && <div className="shipping-error">{errors.address}</div>}
          
          <input name="note" placeholder="Shipping note (optional)" value={shippingInfo.note || ''} onChange={handleChange} className="shipping-input" />
          
          <div className="shipping-row">
            <input name="city" placeholder="City" value={shippingInfo.city || ''} onChange={handleChange} className="shipping-input" />
            <input name="postal" placeholder="Postal Code" value={shippingInfo.postal || ''} onChange={handleChange} className="shipping-input" />
            <input name="province" placeholder="Province" value={shippingInfo.province || ''} onChange={handleChange} className="shipping-input" />
          </div>
          {errors.city && <div className="shipping-error">{errors.city}</div>}
          {errors.postal && <div className="shipping-error">{errors.postal}</div>}
          {errors.province && <div className="shipping-error">{errors.province}</div>}
          
          <div className="shipping-row">
            <select name="country" value={shippingInfo.country || ''} onChange={handleChange} className="shipping-input">
              <option value="">Select Country</option>
              <option value="Georgia">Georgia</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>
          {errors.country && <div className="shipping-error">{errors.country}</div>}
          
          <div className="shipping-row">
            <label className="shipping-checkbox">
              <input type="checkbox" name="saveInfo" checked={shippingInfo.saveInfo || false} onChange={handleChange} />
              Save this informations for a future fast checkout
            </label>
          </div>
          
          <div className="shipping-actions">
            <span className="shipping-back" onClick={() => navigate('/cart')}>Back to cart</span>
            <button type="submit" className="shipping-continue">Go to shipping</button>
          </div>
        </form>
      </div>
      <RightSide />
    </div>

  );

}

export default ShippingInfo