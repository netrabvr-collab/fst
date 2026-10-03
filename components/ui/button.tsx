import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "icon";
};

const variants = {
  default: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
  outline: "border bg-card hover:bg-muted",
  ghost: "hover:bg-muted",
  destructive: "bg-destructive text-white hover:opacity-90",
};
const sizes = { default: "h-11 px-5", sm: "h-9 px-4 text-sm", icon: "h-10 w-10" };

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";