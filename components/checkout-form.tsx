"use client";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { orderSchema, type OrderInput } from "@/lib/schema";
import { placeOrder } from "@/fst/app/actions";
import { useStore, useHydrated } from "@/store/useStore";
import { Button } from "@/fst/components/ui/button";
import { Input, Textarea } from "@/fst/components/ui/input";

type Line = { key: string; label: string; pending: boolean };

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function CheckoutForm() {
  const hydrated = useHydrated();
  const items = useStore((s) => s.items);
  const clear = useStore((s) => s.clear);
  const [isPending, startTransition] = useTransition();
  const [placed, setPlaced] = useState<Line[]>([]);
  const [optimistic, addOptimistic] = useOptimistic(placed, (cur, next: Line) => [next, ...cur]);

  const { register, handleSubmit, setValue, setError, reset, formState: { errors } } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema), // same schema as the server
    defaultValues: { name: "", email: "", address: "", notes: "", items: [] },
  });

  useEffect(() => { setValue("items", items, { shouldValidate: false }); }, [items, setValue]);

  const onSubmit = (values: OrderInput) =>
    startTransition(async () => {
      addOptimistic({ key: "tmp", label: `Placing order for ${values.name}…`, pending: true });
      const res = await placeOrder(values);
      if (res.ok) {
        toast.success(`Order ${res.orderId} placed — $${res.total.toFixed(2)}`);
        setPlaced((p) => [{ key: res.orderId, label: `${res.orderId} confirmed`, pending: false }, ...p]);
        clear();
        reset();
      } else {
        // Map server-side field errors back onto the form
        Object.entries(res.fieldErrors ?? {}).forEach(([k, v]) => v?.[0] && setError(k as keyof OrderInput, { message: v[0] }));
        toast.error(res.message);
      }
    });

  if (hydrated && items.length === 0 && placed.length === 0)
    return <p className="rounded-lg border p-6 text-muted-foreground">Your cart is empty. Add some products first.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-busy={isPending}>
      <Field id="name" label="Full name" error={errors.name?.message}>
        <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} {...register("name")} />
      </Field>
      <Field id="email" label="Email" error={errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} {...register("email")} />
      </Field>
      <Field id="address" label="Delivery address" error={errors.address?.message}>
        <Textarea id="address" autoComplete="street-address" aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-err" : undefined} {...register("address")} />
      </Field>
      <Field id="notes" label="Notes (optional)" error={errors.notes?.message}>
        <Input id="notes" {...register("notes")} />
      </Field>
      {errors.items && <p role="alert" className="text-sm text-destructive">{errors.items.message}</p>}
      <Button type="submit" disabled={isPending} className="w-full">{isPending ? "Placing order…" : "Place order"}</Button>
      <p className="text-xs text-muted-foreground">Tip: enter the name “fail” to see the error-toast path.</p>

      <ul aria-live="polite" className="space-y-2">
        {optimistic.map((l) => (
          <li key={l.key} className={`rounded-md border p-3 text-sm ${l.pending ? "opacity-60" : ""}`}>{l.label}</li>
        ))}
      </ul>
    </form>
  );
}
