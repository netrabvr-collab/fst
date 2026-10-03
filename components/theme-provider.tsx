"use client";
import { ThemeProvider as NextThemes } from "next-themes";
import type { ComponentProps } from "react";

export const ThemeProvider = (props: ComponentProps<typeof NextThemes>) => <NextThemes {...props} />;
