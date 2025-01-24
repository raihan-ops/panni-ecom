'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Toast } from '@/components/shared/toast/Toast';
import { useAuthContext } from './AuthContextProvider';

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalContextProvider({ children }) {
  const { isLogin } = useAuthContext();
  const [cart, setCart] = useState({
    invoice: {
      totalProduct: 0,
      totalPrice: 0,
      finalPrice: 0,
    },
    cartDetailsList: [],
  });
  const [cartLoading, setCartLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const calculateInvoice = (cartDetails) => {
    const totalProduct = cartDetails.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartDetails.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      totalProduct,
      totalPrice,
      finalPrice: totalPrice, // Add any discount logic here if needed
    };
  };

  const updateCart = async (product, quantity, skipLoginCheck = false) => {
    if (!skipLoginCheck && !isLogin) {
      Toast('error', 'Error', 'Please login first');
      return;
    }

    setCartLoading(true);
    try {
      const updatedCart = { ...cart };
      const existingItemIndex = updatedCart.cartDetailsList.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingItemIndex >= 0) {
        if (quantity === 0) {
          updatedCart.cartDetailsList.splice(existingItemIndex, 1);
        } else {
          updatedCart.cartDetailsList[existingItemIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        updatedCart.cartDetailsList.push({
          product,
          quantity,
        });
      }

      updatedCart.invoice = calculateInvoice(updatedCart.cartDetailsList);
      setCart(updatedCart);

      if (!skipLoginCheck) {
        Toast('success', 'Success', 'Cart updated successfully');
      }
    } catch (error) {
      if (!skipLoginCheck) {
        Toast('error', 'Error', 'Failed to update cart');
      }
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = async () => {
    setCartLoading(true);
    try {
      setCart({
        invoice: {
          totalProduct: 0,
          totalPrice: 0,
          finalPrice: 0,
        },
        cartDetailsList: [],
      });
      Toast('success', 'Success', 'Cart cleared successfully');
    } catch (error) {
      Toast('error', 'Error', 'Failed to clear cart');
    } finally {
      setCartLoading(false);
    }
  };

  const getCartItemQuantity = (productId) => {
    const item = cart.cartDetailsList.find((item) => item.product?.id === productId);
    return item?.quantity || 0;
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        cartLoading,
        updateCart,
        clearCart,
        getCartItemQuantity,
        isInitialized,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
