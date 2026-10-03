"use client";
import { useMemo } from "react";
import { Plus, SearchX } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";
import type { Product } from "@/lib/products";
import { ProductImage } from "@/fst/components/product-image";
import { Button } from "@/fst/components/ui/button";
import { money } from "@/lib/utils";

export function ProductGrid({ products }: { products: Product[] }) {
  const category = useStore((s) => s.category);
  const maxPrice = useStore((s) => s.maxPrice);
  const add = useStore((s) => s.add);

  const visible = useMemo(
    () => products.filter((p) => (category === "All" || p.category === category) && p.price <= maxPrice),
    [products, category, maxPrice]
  );

  return (
    <div>
      <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {products.length} products
      </p>
      {visible.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-20 text-muted-foreground">
          <SearchX className="h-8 w-8" /> No products match your filters.
        </div>
      )}
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.id} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <ProductImage
                src={p.image}
                fallback={p.fallback}
                alt={p.name}
                width={720}
                height={900}
                priority={i < 3}
                sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 100vw"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <Button
                size="icon"
                className="absolute bottom-3 right-3 h-11 w-11 shadow-lg"
                aria-label={`Add ${p.name} to cart`}
                onClick={() => { add(p.id); toast.success(`${p.name} added to cart`); }}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                <h3 className="mt-1 font-medium">{p.name}</h3>
              </div>
              <span className="font-serif text-lg">{money(p.price)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}