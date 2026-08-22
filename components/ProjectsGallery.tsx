"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { LightboxImage } from "./Lightbox";
import { LocationSmallIcon } from "./Icons";

export type Project = {
  title: string;
  img: string;
  location: string;
};

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images: LightboxImage[] = projects.map((p) => ({
    src: p.img,
    alt: p.title,
    title: p.title,
    subtitle: p.location,
  }));

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setActiveIndex(i)}
            className="group overflow-hidden rounded-xl border border-gray-100 text-left"
          >
            <div className="relative h-[160px] w-full overflow-hidden">
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-navy">{p.title}</h3>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                <LocationSmallIcon /> {p.location}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
