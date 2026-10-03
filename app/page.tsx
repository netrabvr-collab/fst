import { Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { FilterPanel } from "@/fst/components/filter-panel";
import { ProductGrid } from "@/fst/components/product-grid";
import { ProductImage } from "@/fst/components/product-image";
import { PRODUCTS } from "@/lib/products";

const perks = [
  [Truck, "Free shipping", "On every order"],
  [ShieldCheck, "2-year warranty", "Peace of mind"],
  [RotateCcw, "30-day returns", "No questions asked"],
] as const;

export default function Home() {
  const hero = PRODUCTS[0];
  return (
    <>
      <section className="grid items-center gap-8 rounded-[2rem] bg-muted p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">New collection</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-6xl">
            Everyday tech, <em className="text-primary">beautifully</em> made.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Audio, wearables and accessories chosen for sound, comfort and craft.
          </p>
          <a
            href="#products"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
          >
            Shop the collection
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <ProductImage
            src={hero.image}
            fallback={hero.fallback}
            alt={hero.name}
            width={900}
            height={675}
            priority
            sizes="(min-width:1024px) 45vw, 100vw"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </section>

      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {perks.map(([Icon, t, d]) => (
          <li key={t} className="flex items-center gap-3 px-2 py-3">
            <span className="rounded-full bg-primary/10 p-3 text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
            <div className="text-sm"><p className="font-semibold">{t}</p><p className="text-muted-foreground">{d}</p></div>
          </li>
        ))}
      </ul>

      <h2 id="products" className="mb-8 mt-14 scroll-mt-24 font-serif text-3xl sm:text-4xl">Shop all products</h2>
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <FilterPanel />
        <ProductGrid products={PRODUCTS} />
      </div>
    </>
  );
}