import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  { title: "Arhitectură", text: "Compartimentare adaptabilă, deschideri mari fără pereți portanți în plus." },
  { title: "Confort", text: "Anvelopă eficientă termic — confort constant, indiferent de anotimp." },
  { title: "Execuție", text: "Montaj rapid și planificat, cu componente pregătite controlat în atelier." },
  { title: "Durabilitate", text: "Elemente uscate sub 18% umiditate și îmbinări precise, fără deformări." },
];

export default function CaseDinLemn() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/case-din-lemn" />

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
          <span className="h-1.5 w-6 rounded bg-orange" /> Case pe structură de lemn
        </span>
        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold text-navy md:text-5xl">
          Timber frame
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Rezistență, confort și libertate de compartimentare — cadrul din
          lemn permite deschideri mari, iar izolația integrată susține
          eficiența energetică pe tot parcursul anului.
        </p>

        <div className="relative mt-10 h-[420px] w-full overflow-hidden rounded-2xl">
          <Image src="/images/timber-hero.jpg" alt="Casă timber frame" fill className="object-cover" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-100 bg-graybg p-6">
              <div className="mb-2 h-2 w-2 rounded-full bg-orange" />
              <h3 className="text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-1.5 text-sm text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-orange p-6 sm:flex-row sm:items-center">
          <span className="text-lg font-bold text-navy">
            Timp mediu de execuție structură timber frame
          </span>
          <span className="text-2xl font-extrabold text-navy">30–60 zile</span>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-extrabold text-navy">Lemn uscat și rindeluit</h2>
          <div className="mt-6 flex flex-col gap-6 md:flex-row">
            <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-xl md:w-[360px]">
              <Image src="/images/beams.jpg" alt="Lemn C24 și KVH" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="max-w-xl text-gray-600">
                Folosim lemn C24 și KVH, uscat sub 18% umiditate — stabil,
                precis, fără deformări în timp. Fiecare piesă e debitată cu
                precizie CNC, iar îmbinările sunt presate controlat pentru
                rezistență uniformă.
              </p>
              <Link
                href="/oferta"
                className="mt-6 inline-block w-fit rounded-md bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-soft"
              >
                Cere ofertă pentru casa ta →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
