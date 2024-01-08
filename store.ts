import { Key } from "react";
import { create } from "zustand";

// Define the shape of a basket item
type BasketItem = {
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
};

// Define your store's state
type StoreState = {
  basket: BasketItem[];
  add: (item: BasketItem) => void;
  remove: (item: BasketItem) => void;
};

type CounterStore = {
  count: number;
  inc: (stuff: any) => void;
  dec: () => void;
};

// Create your store
export const useCart = create<StoreState>((set) => ({
  basket: [],
  add: (item) => set((state) => ({ basket: [...state.basket, item] })),
  remove: (item) =>
    set((state) => ({ basket: state.basket.filter((i) => i.id !== item.id) })),
}));

export const useStore = create<CounterStore>((set) => ({
  count: 0,
  inc: (stuff: any) => {
    console.log(stuff);
    return set((state) => ({ count: state.count + 1 }));
  },
  dec: () => set((state) => ({ count: state.count - 1 })),
}));
