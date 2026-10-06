import React, { createContext, useContext, useState, useEffect } from 'react';
import { INSTRUMENTS_DATA } from '../data/instruments';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart items (for Checkout) - Initialized empty per client requirements
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('surgilence_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quote items (for RFQ) - Initialized empty per client requirements
  const [quoteItems, setQuoteItems] = useState(() => {
    try {
      const saved = localStorage.getItem('surgilence_quote_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('surgilence_cart_v2', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('surgilence_quote_v2', JSON.stringify(quoteItems));
    } catch {}
  }, [quoteItems]);

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
