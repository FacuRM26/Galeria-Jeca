import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [pay, setPay] = useState(0);

  return (
    <CartContext.Provider value={{ totalPrice, setTotalPrice, pay, setPay }}>
      { children }
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
