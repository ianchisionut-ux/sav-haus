import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import FadeIn from "@/components/FadeIn";
import { LocationSmallIcon, RulerIcon } from "@/components/Icons";
import { projects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sav Haus`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Header active="/proiecte" />

      <section className="mx-auto max-w-[1200px] px-6 py-14 lg:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-orange">Acasă</Link>
          <span>/</span>
          <Link href="/proiecte" className="transition-colors hover:text-orange">Proiecte</Link>
          <span>/</span>
          <span className="font-medium text-navy">{project.title}</span>
        </nav>

        <FadeIn delay={0.05}>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
            <span className="h-1.5 w-6 rounded bg-orange" /> {project.category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <LocationSmallIcon /> {project.location}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <RulerIcon /> {project.spec}
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-gray-600">{project.description}</p>

          <p className="mt-6 text-sm text-gray-400">
            Apasă pe orice poză pentru a o vedea mărită.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-4">
            <ProjectGallery images={project.images} title={project.title} />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl bg-navy p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Vrei o casă asemănătoare?
              </h2>
              <p className="mt-2 text-gray-300">
                Trimite-ne terenul și bugetul — venim cu o estimare adaptată.
              </p>
            </div>
            <Link
              href="/oferta"
              className="whitespace-nowrap rounded-md bg-orange px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-dark"
            >
              Cere ofertă →
            </Link>
          </div>
        </FadeIn>

        {otherProjects.length > 0 && (
          <div className="mt-16">
            <FadeIn>
              <h2 className="text-xl font-extrabold text-navy">Alte proiecte</h2>
            </FadeIn>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {otherProjects.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/proiecte/${p.slug}`}
                    className="group block overflow-hidden rounded-xl border border-gray-100 transition-shadow hover:shadow-lg"
                  >
                    <div className="relative h-[140px] w-full overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-navy transition-colors group-hover:text-orange-dark">
                        {p.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                        <LocationSmallIcon /> {p.location}
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
