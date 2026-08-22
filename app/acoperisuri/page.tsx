import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  { n: "01", title: "Proiectare", text: "Structură configurată exact pentru forma și geometria clădirii." },
  { n: "02", title: "Prelucrare", text: "Piese pregătite cu tăieri și frezări precise, control CNC." },
  { n: "03", title: "Montaj", text: "Asamblare etapizată și verificarea geometriei la fiecare pas." },
  { n: "04", title: "Personalizare", text: "Soluții adaptate fiecărei construcții, fără șabloane fixe.", dark: true },
];

export default function Acoperisuri() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/acoperisuri" />

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
          <span className="h-1.5 w-6 rounded bg-orange" /> Servicii
        </span>
        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold text-navy md:text-5xl">
          Acoperișuri durabile
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Structura, geometria, reazemele și îmbinările trebuie coordonate
          într-un singur sistem. Pregătirea controlată a elementelor susține
          montajul exact și protecția pe termen lung.
        </p>

        <div className="relative mt-10 h-[420px] w-full overflow-hidden rounded-2xl">
          <Image src="/images/roof-hero.jpg" alt="Acoperiș din lemn" fill className="object-cover" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className={
                s.dark
                  ? "rounded-xl bg-navy p-6"
                  : "rounded-xl border border-gray-100 bg-graybg p-6"
              }
            >
              <span className="inline-block rounded-full bg-orange px-3 py-1 text-xs font-bold text-navy">
                {s.n}
              </span>
              <h3 className={`mt-3 text-lg font-bold ${s.dark ? "text-white" : "text-navy"}`}>
                {s.title}
              </h3>
              <p className={`mt-1.5 text-sm ${s.dark ? "text-gray-300" : "text-gray-600"}`}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative h-[260px] overflow-hidden rounded-xl">
            <Image src="/images/carport.jpg" alt="Carport din lemn" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <span className="absolute bottom-4 left-5 text-lg font-bold text-white">Carport</span>
          </div>
          <div className="relative h-[260px] overflow-hidden rounded-xl">
            <Image src="/images/galerii.jpg" alt="Galerii lemn KLH" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <span className="absolute bottom-4 left-5 text-lg font-bold text-white">Galerii</span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/oferta"
            className="inline-block rounded-md bg-orange px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-orange-dark"
          >
            Cere ofertă pentru acoperiș →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
