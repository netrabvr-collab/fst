export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Audio" | "Wearables" | "Accessories";
  image: string;    // real photo
  fallback: string; // local illustration, used if the photo fails to load
};

export const CATEGORIES = ["All", "Audio", "Wearables", "Accessories"] as const;

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Studio Headphones", price: 129, category: "Audio", image: u("1505740420928-5e560c06d30e"), fallback: "/products/headphones.svg" },
  { id: "p2", name: "Portable Speaker", price: 59, category: "Audio", image: u("1608043152269-423dbba4e7e1"), fallback: "/products/speaker.svg" },
  { id: "p3", name: "Smart Watch", price: 199, category: "Wearables", image: u("1523275335684-37898b6baf30"), fallback: "/products/watch.svg" },
  { id: "p4", name: "Fitness Band", price: 49, category: "Wearables", image: u("1575311373937-040b8e1fd5b6"), fallback: "/products/band.svg" },
  { id: "p5", name: "USB-C Cable", price: 12, category: "Accessories", image: u("1583863788434-e58a36330cf0"), fallback: "/products/cable.svg" },
  { id: "p6", name: "Laptop Stand", price: 35, category: "Accessories", image: u("1527864550417-7fd91fc51a46"), fallback: "/products/stand.svg" },
  { id: "p7", name: "Wireless Earbuds", price: 89, category: "Audio", image: u("1590658268037-6bf12165a8df"), fallback: "/products/earbuds.svg" },
  { id: "p8", name: "Phone Case", price: 19, category: "Accessories", image: u("1601784551446-20c9e07cdbdb"), fallback: "/products/case.svg" },
];

export const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.id, p]));