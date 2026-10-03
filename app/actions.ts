"use server";
import { revalidatePath } from "next/cache";
import { orderSchema, type ActionResult } from "@/lib/schema";
import { PRODUCT_MAP } from "@/lib/products";
import { addOrder } from "@/lib/orders";

export async function placeOrder(input: unknown): Promise<ActionResult> {
  // Never trust the client: re-validate with the SAME schema (also trims/lowercases).
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const { name, email, items } = parsed.data;

  // Recompute price on the server — client-sent prices are never used.
  let total = 0;
  for (const i of items) {
    const p = PRODUCT_MAP.get(i.id);
    if (!p) return { ok: false, message: `Unknown product: ${i.id}` };
    total += p.price * i.qty;
  }

  await new Promise((r) => setTimeout(r, 1000)); // simulate latency
  if (name.toLowerCase() === "fail") return { ok: false, message: "Payment provider unavailable (demo error)." };

  const orderId = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  addOrder({ id: orderId, name, email, total, createdAt: new Date().toISOString() });
  revalidatePath("/checkout");
  return { ok: true, orderId, total };
}
