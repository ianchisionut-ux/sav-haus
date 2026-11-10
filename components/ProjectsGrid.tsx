import Link from "next/link";
import Image from "next/image";
import { LocationSmallIcon } from "./Icons";
import type { ProjectDetail } from "@/lib/projects";

export default function ProjectsGrid({ projects }: { projects: ProjectDetail[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/proiecte/${p.slug}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#dfe5e1] bg-white shadow-[0_10px_30px_rgba(8,25,35,.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F9982D]/55 hover:shadow-[0_20px_46px_rgba(8,25,35,.15)] focus-visible:outline-2 focus-visible:outline-[#F9982D]"
        >
          <div className="relative aspect-[1.4] w-full overflow-hidden bg-[#e2e8e4]">
            <Image
              src={p.images[0]}
              alt={p.title}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#081923]/20 to-transparent" />
            <span className="absolute left-4 top-4 rounded-md border border-white/30 bg-[#081923]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.10em] text-white backdrop-blur-sm">
              {p.category}
            </span>
            <span className="absolute right-4 top-4 rounded-md bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-[#081923]">
              {p.images.length} {p.images.length === 1 ? "poză" : "poze"}
            </span>
          </div>
          <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
            <div className="mb-2 h-[2px] w-9 bg-[#F9982D]" />
            <h3 className="min-h-[2.8em] text-[16px] font-extrabold leading-[1.4] text-[#081923] transition-colors duration-200 group-hover:text-[#c96c10]">
              {p.title}
            </h3>
            <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-[#687b75]">
              <LocationSmallIcon /> <span>{p.location}</span>
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e3e9e6] pt-4 mt-5">
              <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#51645f]">Vezi proiectul</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#081923] text-lg text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#F9982D] group-hover:text-[#081923]" aria-hidden="true">↗</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
