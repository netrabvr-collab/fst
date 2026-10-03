import { Suspense } from "react";
import { CheckoutForm } from "@/fst/components/checkout-form";
import { OrdersList, OrdersSkeleton } from "@/fst/components/orders-list";

export const metadata = { title: "Checkout · ShopLite" };

export default function CheckoutPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        <CheckoutForm />
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent orders</h2>
        <Suspense fallback={<OrdersSkeleton />}>
          <OrdersList />
        </Suspense>
      </section>
    </div>
  );
}
