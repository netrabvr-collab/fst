"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/fst/components/ui/button";

/**
 * No `mounted` state needed: both icons are always rendered and swapped with
 * the `dark:` CSS variant, so server HTML === client HTML (no hydration mismatch)
 * and the icon never causes layout shift (fixed-size button).
 */
export function ThemeToggle() {
  const { setTheme } = useTheme();
  const items = [
    ["light", Sun],
    ["dark", Moon],
    ["system", Monitor],
  ] as const;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={6} className="z-50 min-w-[8rem] rounded-md border bg-card p-1 shadow-lg">
          {items.map(([name, Icon]) => (
            <DropdownMenu.Item
              key={name}
              onSelect={() => setTheme(name)}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm capitalize outline-none data-[highlighted]:bg-muted"
            >
              <Icon className="h-4 w-4" /> {name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
