import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/fst/components/theme-provider";
import { ThemeToggle } from "@/fst/components/theme-toggle";
import { CartSheet } from "@/fst/components/cart-sheet";
import { StoreHydrator } from "@/fst/components/store-hydrator";
import { WebVitals } from "@/fst/components/web-vitals";
import { PRODUCTS } from "@/lib/products";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "ShopLite",
  description: "Accessible Next.js demo: Zustand, Zod & Server Actions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-primary focus:p-2 focus:text-primary-foreground">Skip to content</a>
          <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
              <Link href="/" className="font-serif text-2xl font-semibold tracking-tight">
                Shop<span className="text-primary">Lite</span>
              </Link>
              <nav aria-label="Main" className="flex items-center gap-2">
                <CartSheet products={PRODUCTS} />
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main id="main" className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">{children}</main>
          <footer className="mt-16 border-t py-10 text-center text-sm text-muted-foreground">
            <p className="font-serif text-lg text-foreground">ShopLite</p>
            <p className="mt-1">© 2026 · Built with Next.js, Zustand &amp; Zod</p>
          </footer>
          <Toaster richColors position="bottom-right" />
          <StoreHydrator />
          <WebVitals />
        </ThemeProvider>
      </body>
    </html>
  );
}