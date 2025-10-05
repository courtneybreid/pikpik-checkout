import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; product: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
}>({
  state: { items: [] },
  dispatch: () => {},
});

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { items: [] };
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0), // remove if quantity hits 0
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] }, () => {
    const stored = localStorage.getItem("cart");
    return stored ? { items: JSON.parse(stored) } : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { state, dispatch, total };
}
