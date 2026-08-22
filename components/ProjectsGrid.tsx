import Link from "next/link";
import Image from "next/image";
import { LocationSmallIcon } from "./Icons";
import type { ProjectDetail } from "@/lib/projects";

export default function ProjectsGrid({ projects }: { projects: ProjectDetail[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/proiecte/${p.slug}`}
          className="group overflow-hidden rounded-xl border border-gray-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/10"
        >
          <div className="relative h-[160px] w-full overflow-hidden">
            <Image
              src={p.images[0]}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/10" />
            {p.images.length > 1 && (
              <span className="absolute right-2 top-2 rounded-md bg-navy/80 px-2 py-1 text-[10px] font-bold text-white">
                {p.images.length} poze
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold text-navy transition-colors group-hover:text-orange-dark">
              {p.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
              <LocationSmallIcon /> {p.location}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
