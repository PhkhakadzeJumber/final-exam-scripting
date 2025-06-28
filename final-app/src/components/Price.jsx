import { useCart } from '../contexts/Context';

function Price({priceUSD, className = ""}) {

  const { currency, currencyRates } = useCart();

  return (
    <p className={`product-price product-price-detail cart-summary-value ${className}`}>{currency}{Number(priceUSD*currencyRates[currency]).toFixed(2)}</p>
  );
  
}

export default Price