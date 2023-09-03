import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [prices, setPrices] = useState({}); // Add this line

  const addToCart = (item) => {
    // Check if the item is already in the cart
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((prevCart) => [...prevCart, item]);
      // Set the price in the prices object
      setPrices((prevPrices) => ({ ...prevPrices, [item.id]: item.price }));
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    // Remove the price from the prices object
    setPrices((prevPrices) => ({ ...prevPrices, [itemId]: undefined }));
  };

  const clearCart = () => {
    setCart([]);
    setPrices({});
  };

  return (
    <CartContext.Provider value={{ cart, prices, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};