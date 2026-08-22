import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Proiecte — Sav Haus",
  description: "14 proiecte publicate: case, A-frame, acoperișuri, carport, etajare și galerie.",
};

export default function Proiecte() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/proiecte" />

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
            <span className="h-1.5 w-6 rounded bg-orange" /> Lucrări executate
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-navy md:text-5xl">
            {projects.length} proiecte publicate
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Case, A-frame, acoperișuri, carport, etajare și galerie — din Cluj,
            Zalău, Stoboru și Timișoara. Fiecare proiect are pagina lui
            proprie, cu poze mărite.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10">
            <ProjectsGrid projects={projects} />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl bg-navy p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Vrei să vezi proiectul tău aici?
              </h2>
              <p className="mt-2 text-gray-300">
                Fiecare lucrare din portofoliu a pornit de la un teren și un
                buget — ca al tău.
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
      </section>

      <Footer />
    </main>
  );
}
