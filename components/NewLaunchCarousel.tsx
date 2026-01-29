"use client";

import { useEffect, useMemo, useState } from "react";

export type NewLaunchCarouselItem = {
  image: string;
  alt: string;
};

export default function NewLaunchCarousel({
  items,
  intervalMs = 3500,
}: {
  items: NewLaunchCarouselItem[];
  intervalMs?: number;
}) {
  const slides = useMemo(() => items.filter((i) => !!i.image), [items]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0">
      {slides.map((s, i) => (
        <div
          key={`${s.image}-${i}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt={s.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

