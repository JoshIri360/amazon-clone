import { Key } from "react";
import { create } from "zustand";

// Define the shape of a cart item
type CartItem = {
  id: Key;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
};

// Define your store's state
type StoreState = {
  cart: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: Key) => void;
  increaseQuantity: (id: Key) => void; // Add increaseQuantity function
  decreaseQuantity: (id: Key) => void; // Add decreaseQuantity function
};

type CounterStore = {
  count: number;
  inc: (stuff: any) => void;
  dec: () => void;
};

// Create your store
export const useCart = create<StoreState>((set) => ({
  cart: [],
  add: (item) => set((state) => ({ cart: [...state.cart, item] })),
  remove: (id) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      ),
    })),
}));

export const useStore = create<CounterStore>((set) => ({
  count: 0,
  inc: (stuff: any) => {
    console.log(stuff);
    return set((state) => ({ count: state.count + 1 }));
  },
  dec: () => set((state) => ({ count: state.count - 1 })),
}));
