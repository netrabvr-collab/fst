"use client";
import { useStore } from "@/store/useStore";
import { CATEGORIES } from "@/lib/products";
import { Button } from "@/fst/components/ui/button";
import { money } from "@/lib/utils";

export function FilterPanel() {
  const category = useStore((s) => s.category);
  const maxPrice = useStore((s) => s.maxPrice);
  const setCategory = useStore((s) => s.setCategory);
  const setMaxPrice = useStore((s) => s.setMaxPrice);
  const reset = useStore((s) => s.resetFilters);

  return (
    <aside aria-label="Product filters" className="space-y-6 rounded-2xl border bg-card p-6 md:sticky md:top-24 md:self-start">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Category</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button key={c} size="sm" variant={category === c ? "default" : "outline"} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </Button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="price" className="mb-2 block text-sm font-semibold">Max price: {money(maxPrice)}</label>
        <input
          id="price"
          type="range"
          suppressHydrationWarning
          min={10}
          max={250}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-[hsl(var(--primary))]"
        />
      </div>
      <Button variant="ghost" size="sm" onClick={reset}>Reset filters</Button>
    </aside>
  );
}
