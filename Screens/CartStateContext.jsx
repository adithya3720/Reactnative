import React, { createContext, useState } from 'react';

export const CartStateContext = createContext(null);

export function CartStateProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartStateContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartStateContext.Provider>
  );
}
