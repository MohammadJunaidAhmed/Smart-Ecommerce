import React, { createContext, useContext, useState } from 'react';
import CartPrice from '../Cart/CartPrice';
import { CartItem } from '../../../../server/src/models/cart-item';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = () => {
    const [cart, setCart] = useState(null);

    const updateCart = (newCart) => {
      setCart(newCart);
    };
  
    return (
      <CartContext.Provider value={{ cart, updateCart }}>
        <CartItem/>
        <CartPrice/>
      </CartContext.Provider>
    );
}
