"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { LightboxImage } from "./Lightbox";

export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = images.map((src, i) => ({
    src,
    alt: `${title} — poza ${i + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveIndex(i)}
            className={`group relative overflow-hidden rounded-xl ${
              i === 0 && images.length > 1 ? "sm:col-span-2" : ""
            }`}
          >
            <div className={`relative w-full ${i === 0 && images.length > 1 ? "h-[420px]" : "h-[300px]"}`}>
              <Image
                src={src}
                alt={`${title} — poza ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
