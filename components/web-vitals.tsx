"use client";
import { useReportWebVitals } from "next/web-vitals";

/** Logs LCP / CLS / INP / FCP / TTFB to the console (and could POST to an analytics endpoint). */
export function WebVitals() {
  useReportWebVitals((m) => {
    console.log(`[web-vitals] ${m.name}: ${m.value.toFixed(m.name === "CLS" ? 4 : 0)} (${m.rating})`);
  });
  return null;
}
