import { getOrders } from "@/lib/orders";
import { Skeleton } from "@/components/ui/skeleton";
import { money } from "@/lib/utils";

/** Async SERVER component — streamed in via <Suspense>. Ships zero JS to the browser. */
export async function OrdersList() {
  const orders = await getOrders();
  if (!orders.length) return <p className="text-sm text-muted-foreground">No orders yet.</p>;
  return (
    <ul className="space-y-2">
      {orders.map((o) => (
        <li key={o.id} className="flex justify-between rounded-md border bg-card p-3 text-sm">
          <span>{o.id} · {o.name}</span><span className="font-medium">{money(o.total)}</span>
        </li>
      ))}
    </ul>
  );
}

export const OrdersSkeleton = () => (
  <div className="space-y-2" role="status" aria-label="Loading orders">
    {[0, 1, 2].map((i) => <Skeleton key={i} className="h-11 w-full" />)}
  </div>
);
