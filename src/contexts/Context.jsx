import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [category, setCategory] = useState("man");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "$");
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "", email: "", phone: "", address: "", zip: "", country: "",
  });

  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({cardNumber: "", expiry: "", cvc: "", nameOnCard: ""});

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const currencyRates = {"$": 1, "€": 0.87,"¥": 146};

  const getTotalUSD = () => {
    let total = 0;
    for(let item of cart)
        total += item.product.price * item.quantity;

    return total;
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (

    <CartContext.Provider value={{
      cart,
      setCart,
      category,
      setCategory,
      currency,
      setCurrency,
      currencyRates,
      getTotalUSD,
      shippingInfo,
      setShippingInfo,
      shippingMethod,
      setShippingMethod,
      paymentInfo,
      setPaymentInfo,
      isMiniCartOpen,
      setIsMiniCartOpen,
    }}
    >
      {children}
    </CartContext.Provider>

  );

}