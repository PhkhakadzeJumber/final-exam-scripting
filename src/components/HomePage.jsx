import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Products from '../Products.json';
import '../styles/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../contexts/Context';
import Price from './Price';
import Navbar from './Navbar';

function ProductList() {

  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const { setCart, isMiniCartOpen } = useCart();

  useEffect(() => {
    setProducts(Products);
  }, []);

  const filteredProducts = category ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase()) : products;

  const handleAddToCart = (product) => {
    const selectedSize = product.sizes[0];

    setCart(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(
        item => item.product.id === product.id && item.size === selectedSize
      );

      if(existingItemIndex > -1) {
        const updatedCart = [...prevCartItems];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [
          ...prevCartItems,
          {
            product: product,
            size: selectedSize,
            quantity: 1,
            imageIdx: 0,
          },
        ];
      }
    });
  };

  return (

    <div>
      <Navbar/>
      <div className={`product-list${isMiniCartOpen ? ' blurred' : ''}`}>
        <div className='category-name'><p>Category name</p></div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.images[0]} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <Price priceUSD={product.price}/>
              </div>
              <div className="add-to-cart" onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    
  );
  
}

export default ProductList; 