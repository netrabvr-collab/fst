// In-memory "database" (resets when the server restarts). Swap for Prisma/Drizzle later.
export type Order = { id: string; name: string; email: string; total: number; createdAt: string };

const g = globalThis as unknown as { __orders?: Order[] };
g.__orders ??= [];

export const addOrder = (o: Order) => void g.__orders!.unshift(o);
export const getOrders = async (): Promise<Order[]> => {
  await new Promise((r) => setTimeout(r, 1200)); // simulate slow DB so <Suspense> skeleton is visible
  return g.__orders!.slice(0, 5);
};
