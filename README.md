# ShopLite — Next.js Assignment 1 (DJS23AMD302)

Accessible, type-safe Next.js App Router app: **shadcn-style + Radix primitives**, **next-themes**, **Zustand (persisted)**, **react-hook-form + Zod**, **Server Actions**, **Suspense**, **optimistic UI**, **OG image**, **Web Vitals**.

## 1. Install prerequisites
- **Node.js 18.18+** (20 LTS recommended) → https://nodejs.org  (check: `node -v`)
- **npm** (bundled with Node) and **Git** (for GitHub)
- Internet access on first run (downloads the Inter font via `next/font`)

## 2. Run
```bash
cd shoplite
npm install
npm run dev          # http://localhost:3000
```
Production + Lighthouse:
```bash
npm run build
npm start            # http://localhost:3000
```

## 3. Try it
1. Toggle theme (light/dark/system) — refresh: no flash, no hydration warning.
2. Filter by category/price, add items, reload — cart + filters persist (localStorage).
3. Cart → Checkout → submit empty form (inline Zod errors) → fill and submit (optimistic line → success toast; "Recent orders" streams in behind a skeleton).
4. Enter name `fail` to see the server-error toast path.
5. Visit `/opengraph-image` to see the generated social image.
6. Open DevTools console to see `[web-vitals]` logs.

## 4. Structure
```
app/layout.tsx            Server. Mounts client islands (theme, cart, toaster, vitals)
app/page.tsx              Server. Passes serialisable `products` to client grid
app/checkout/page.tsx     Server. Form + <Suspense> orders list
app/actions.ts            'use server' placeOrder() – re-validates with shared Zod schema
app/opengraph-image.tsx   Dynamic OG image (next/og)
lib/schema.ts             SHARED Zod schema (client + server)
store/useStore.ts         Zustand persist store (cart slice + filter slice)
components/               ui/ primitives, theme-toggle, cart-sheet, filter-panel, product-grid, checkout-form, orders-list
```

## 5. Part A — RSC / Client boundary audit (for your report)
| File | Type | Why |
|---|---|---|
| layout.tsx, page.tsx, checkout/page.tsx, orders-list.tsx | Server | No state/effects; async data; zero client JS |
| theme-provider/toggle, cart-sheet, filter-panel, product-grid, checkout-form, store-hydrator, web-vitals | Client (`'use client'`) | Hooks, event handlers, browser APIs |

**Serialisation:** `PRODUCTS` (plain JSON objects) flows server → client as props (`<CartSheet products>`, `<ProductGrid products>`). Functions/classes can't cross; Server Actions can (as references).

**Hydration safety:** `suppressHydrationWarning` on `<html>` (next-themes sets the class pre-hydration); theme icons swap via CSS `dark:` (no `mounted` flash); Zustand uses `skipHydration` + rehydrate in `useEffect`, and `useHydrated()` gates persisted UI so server HTML = first client render; badge has fixed width (no CLS).

## 6. Part B — Zustand vs server state
- **Zustand**: ephemeral/user-local UI state (cart, filters) – instant, persisted in browser.
- **Server state** (orders): source of truth on server, fetched in RSC, refreshed by `revalidatePath`.
- Narrow selectors (`useStore(s => s.category)`) mean the cart badge doesn't re-render on filter changes, and `layout.tsx` itself never subscribes.

## 7. Lighthouse (for the report)
`npm run build && npm start` → Chrome DevTools → Lighthouse → Mobile → record **LCP, CLS, INP/TBT**. Take before/after screenshots (e.g. with vs without `skipHydration` gating, or with/without skeleton). Use an Incognito window with extensions off.

## 8. Push to GitHub
```bash
git init && git add . && git commit -m "Assignment 1"
git branch -M main
git remote add origin https://github.com/<you>/shoplite.git
git push -u origin main
```
