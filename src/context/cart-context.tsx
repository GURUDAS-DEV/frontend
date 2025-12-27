"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  id: string;
  quantity: number;
  name?: string;
  sku?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    const ids = JSON.parse(localStorage.getItem("3mItems") || "[]");

    if (!ids.length) {
      setCartItems([]);
      return;
    }

    try {
      const items = await Promise.all(
        ids.map(async (id: string) => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/getCart/${id}`
          );

          const item = res.data.item[0];

          return {
            id: item.order_id,
            quantity: item.quantity,
            name: item.name,
            sku: item.sku,
          };
        })
      );

      setCartItems(items);
    } catch (err) {
      console.error("Failed to refresh cart", err);
      setCartItems([]);
    }
  };

  // 🔥 Load cart once on app start
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
