import React, { createContext, useContext, useState, useEffect } from 'react';
import { INSTRUMENTS_DATA } from '../data/instruments';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart items (for Checkout)
  const [cartItems, setCartItems] = useState([
    {
      ...INSTRUMENTS_DATA[0],
      quantity: 5,
      selectedPrice: INSTRUMENTS_DATA[0].bulkPriceUSD
    },
    {
      ...INSTRUMENTS_DATA[7],
      quantity: 10,
      selectedPrice: INSTRUMENTS_DATA[7].bulkPriceUSD
    }
  ]);

  // Quote items (for RFQ)
  const [quoteItems, setQuoteItems] = useState([
    {
      ...INSTRUMENTS_DATA[1],
      quantity: 10,
      laserNote: "Hospital Surgery Dept"
    }
  ]);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const newQty = existing ? existing.quantity + quantity : quantity;
      const unitPrice = newQty >= 10 ? product.bulkPriceUSD : product.priceUSD;

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQty, selectedPrice: unitPrice }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: newQty, selectedPrice: unitPrice }];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to Order Cart`);
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const unitPrice = quantity >= 10 ? item.bulkPriceUSD : item.priceUSD;
          return { ...item, quantity, selectedPrice: unitPrice };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Quote operations
  const addToQuote = (product, quantity = 1, laserNote = '') => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, laserNote: laserNote || item.laserNote }
            : item
        );
      } else {
        return [...prev, { ...product, quantity, laserNote }];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to Quotation Basket`);
  };

  const updateQuoteQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromQuote(id);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromQuote = (id) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearQuote = () => setQuoteItems([]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const quoteCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        updateCartQty: updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartSubtotalUSD: cartTotal,
        cartCount,
        quoteItems,
        addToQuote,
        updateQuoteQuantity,
        updateQuoteQty: updateQuoteQuantity,
        removeFromQuote,
        clearQuote,
        quoteCount,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
