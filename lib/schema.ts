import { z } from "zod";

/**
 * SHARED schema: imported by the client form (zodResolver) AND by the
 * Server Action. One source of truth => end-to-end type safety.
 * Transforms (trim / lowercase) act as server-side sanitisation.
 */
export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(200),
  notes: z.string().trim().max(300, "Max 300 characters").optional().or(z.literal("")),
  items: z
    .array(z.object({ id: z.string(), qty: z.number().int().min(1).max(20) }))
    .min(1, "Your cart is empty"),
});

export type OrderInput = z.input<typeof orderSchema>;
export type OrderData = z.output<typeof orderSchema>;

export type ActionResult =
  | { ok: true; orderId: string; total: number }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };
