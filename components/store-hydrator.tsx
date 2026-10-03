"use client";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

/** Renders nothing; just triggers localStorage rehydration after mount. */
export function StoreHydrator() {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);
  return null;
}
