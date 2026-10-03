"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductImage({ src, fallback, alt, ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...rest}
      alt={alt}
      src={failed ? fallback : src}
      unoptimized={failed} // local SVG can't go through the image optimizer
      onError={() => setFailed(true)}
      // catches images that failed before React hydrated
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
      }}
    />
  );
}