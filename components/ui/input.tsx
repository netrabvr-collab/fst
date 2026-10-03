import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-md border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-[invalid=true]:border-destructive";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...p }, ref) => <input ref={ref} suppressHydrationWarning className={cn(base, "h-10", className)} {...p} />
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...p }, ref) => <textarea ref={ref} suppressHydrationWarning className={cn(base, "min-h-[80px]", className)} {...p} />
);
Textarea.displayName = "Textarea";
