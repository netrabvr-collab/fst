"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";

type CartItem = { id: string; qty: number };

type State = {
  // cart slice
  items: CartItem[];
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  // filter slice
  category: string;
  maxPrice: number;
  setCategory: (c: string) => void;
  setMaxPrice: (n: number) => void;
  resetFilters: () => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      items: [],
      add: (id) =>
        set((s) => {
          const found = s.items.find((i) => i.id === id);
          return {
            items: found
              ? s.items.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + 1, 20) } : i))
              : [...s.items, { id, qty: 1 }],
          };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),

      category: "All",
      maxPrice: 250,
      setCategory: (category) => set({ category }),
      setMaxPrice: (maxPrice) => set({ maxPrice }),
      resetFilters: () => set({ category: "All", maxPrice: 250 }),
    }),
    {
      name: "shoplite-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // we rehydrate AFTER mount => server HTML === first client render
      partialize: (s) => ({ items: s.items, category: s.category, maxPrice: s.maxPrice }),
    }
  )
);

/** true once localStorage has been merged into the store (client only). */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(useStore.persist.hasHydrated());
    return useStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
