'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Toast } from '@/components/shared/toast/Toast';
import { useAuthContext } from './AuthContextProvider';
import api from '@/providers/Api';
import { GET_SETTINGS_API_URL } from '@/helpers/apiUrl';

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
      discountAmount: 0,
    },
    cartDetailsList: [],
  });
  const [cartLoading, setCartLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [settingsLoader, setSettingsLoader] = useState(false);
  const [settingsData, setSettingsData] = useState({});

  useEffect(() => {
    getSettingsApi();
  }, []);
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

  const getSettingsApi = () => {
    api.getSingleData(
      {
        url: GET_SETTINGS_API_URL,
        setLoading: setSettingsLoader,
      },
      (res) => {
        if (res.data) {
          setSettingsData(res.data);
        }
      },
    );
  };

  const calculateInvoice = (cartDetails) => {
    const totalProduct = cartDetails?.reduce((sum, item) => sum + item?.quantity, 0);

    let totalOriginalPrice = 0;
    let totalDiscountedPrice = 0;

    cartDetails?.forEach((item) => {
      const basePrice = item?.product?.price;
      const quantity = item?.quantity;

      // Check both discount types and use the applicable one
      const productOfferDiscount = item?.product?.productOffer?.discountPercentage || 0;
      const normalDiscount = item?.product?.discountPercentage || 0;

      // Use product offer discount if available, otherwise use normal discount
      const applicableDiscount = productOfferDiscount > 0 ? productOfferDiscount : normalDiscount;

      const originalPriceForItem = basePrice * quantity;
      const discountedPriceForItem = basePrice * (1 - applicableDiscount / 100) * quantity;

      totalOriginalPrice += originalPriceForItem;
      totalDiscountedPrice += discountedPriceForItem;
    });

    const totalDiscountAmount = Math.round(totalOriginalPrice - totalDiscountedPrice);

    return {
      totalProduct,
      totalPrice: Math.round(totalOriginalPrice),
      discountAmount: totalDiscountAmount,
      finalPrice: Math.round(totalDiscountedPrice),
    };
  };

  const updateCart = async (
    product,
    quantity,
    selectedColor,
    selectedSize,
    fromByNow = false,
    skipLoginCheck = false,
  ) => {
    // if (!skipLoginCheck && !isLogin) {
    //   Toast('error', 'Error', 'Please login first');
    //   return;
    // }

    setCartLoading(true);
    try {
      let updatedCart;
      if (fromByNow) {
        updatedCart = {
          invoice: {
            totalProduct: 0,
            totalPrice: 0,
            finalPrice: 0,
            discountAmount: 0,
          },
          cartDetailsList: [],
        };
      } else {
        updatedCart = { ...cart };
      }
      const existingItemIndex = updatedCart?.cartDetailsList?.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize,
      );

      if (existingItemIndex >= 0) {
        if (quantity === 0) {
          updatedCart.cartDetailsList.splice(existingItemIndex, 1);
        } else {
          updatedCart.cartDetailsList[existingItemIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        updatedCart?.cartDetailsList?.push({
          product,
          quantity,
          selectedColor,
          selectedSize,
        });
      }

      updatedCart.invoice = calculateInvoice(updatedCart.cartDetailsList);
      setCart(updatedCart);

      if (!skipLoginCheck) {
        Toast('success', 'Success', 'Cart updated successfully');
      }
    } catch (error) {
      console.error('error', error);
      if (!skipLoginCheck) {
        Toast('error', 'Error', 'Failed to update cart');
      }
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = async (showToast = true) => {
    setCartLoading(true);
    try {
      const emptyCart = {
        invoice: {
          totalProduct: 0,
          totalPrice: 0,
          finalPrice: 0,
          discountAmount: 0,
        },
        cartDetailsList: [],
      };

      // Update state and localStorage synchronously
      setCart(emptyCart);
      // localStorage.setItem('cart', JSON.stringify(emptyCart));

      if (showToast) {
        Toast('success', 'Success', 'Cart cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
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
        settingsData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
