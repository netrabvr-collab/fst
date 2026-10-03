"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/fst/components/product-image";
import { useState } from "react";
import { useStore, useHydrated } from "@/store/useStore";
import type { Product } from "@/lib/products";
import { Button } from "@/fst/components/ui/button";
import { money } from "@/lib/utils";

/**
 * `products` arrives as a SERIALISED prop from the server layout (plain JSON:
 * no functions/classes/Dates-with-methods). Only the cart *ids/qty* live in Zustand.
 */
export function CartSheet({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  // Narrow selectors => this component does NOT re-render on filter changes.
  const items = useStore((s) => s.items);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.remove);
  const count = useStore((s) => s.items.reduce((n, i) => n + i.qty, 0));

  const lines = items.flatMap((i) => {
    const p = products.find((x) => x.id === i.id);
    return p ? [{ ...p, qty: i.qty }] : [];
  });
  const total = lines.reduce((n, l) => n + l.price * l.qty, 0);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="relative" aria-label={`Open cart, ${hydrated ? count : 0} items`}>
          <ShoppingCart className="h-4 w-4" /> Cart
          {/* fixed-size badge slot => no CLS when count appears after hydration */}
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
            {hydrated ? count : 0}
          </span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l bg-card p-6 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">Your cart</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close cart"><X className="h-4 w-4" /></Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Items in your shopping cart</Dialog.Description>

          <ul className="mt-4 flex-1 space-y-3 overflow-y-auto">
            {lines.length === 0 && <li className="text-sm text-muted-foreground">Your cart is empty.</li>}
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-3 rounded-md border p-3">
                <ProductImage src={l.image} fallback={l.fallback} alt="" width={64} height={64} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-muted-foreground">{money(l.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="outline" className="h-7 w-7" aria-label={`Decrease ${l.name}`} onClick={() => setQty(l.id, l.qty - 1)}><Minus className="h-3 w-3" /></Button>
                  <span className="w-6 text-center text-sm" aria-live="polite">{l.qty}</span>
                  <Button size="icon" variant="outline" className="h-7 w-7" aria-label={`Increase ${l.name}`} onClick={() => setQty(l.id, l.qty + 1)}><Plus className="h-3 w-3" /></Button>
                </div>
                <Button size="icon" variant="ghost" className="h-7 w-7" aria-label={`Remove ${l.name}`} onClick={() => remove(l.id)}><X className="h-3 w-3" /></Button>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-4">
            <div className="mb-3 flex justify-between font-semibold"><span>Total</span><span>{money(total)}</span></div>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              aria-disabled={!lines.length}
              className={`inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${!lines.length ? "pointer-events-none opacity-50" : ""}`}
            >
              Checkout
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
