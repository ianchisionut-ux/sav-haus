import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const values = [
  { title: "Rezistență", text: "Structuri calculate și executate pentru solicitări reale și utilizare îndelungată." },
  { title: "Experiență", text: "Specializare în lemn, coordonare tehnică și soluții potrivite fiecărui proiect." },
  { title: "Calitate / preț", text: "Execuție responsabilă și raport echilibrat între investiție, precizie și durabilitate.", dark: true },
];

export default function DespreNoi() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/despre-noi" />

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
            <span className="h-1.5 w-6 rounded bg-orange" /> Despre companie
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold text-navy md:text-5xl">
            Construcții gândite corect, de la proiect la montaj.
          </h1>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-lg shadow-navy/5 md:h-[420px]">
              <Image src="/images/about.jpg" alt="Construcție Sav Haus" fill className="object-cover" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <p className="text-lg leading-relaxed text-gray-600">
                SAV HAUS este specializată în construcții din lemn și
                acoperișuri. Experiența de șantier este completată de
                proiectare digitală și prelucrare controlată — fiecare piesă e
                debitată exact, fiecare îmbinare e calculată dinainte să ajungă
                pe teren.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className={
                      v.dark
                        ? "rounded-xl bg-navy p-5 transition-shadow hover:shadow-lg"
                        : "rounded-xl bg-graybg p-5 transition-shadow hover:shadow-md"
                    }
                  >
                    <h3 className={`font-bold ${v.dark ? "text-white" : "text-navy"}`}>
                      {v.title}
                    </h3>
                    <p className={`mt-1 text-sm ${v.dark ? "text-gray-300" : "text-gray-600"}`}>
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-navy">Proiectare și prelucrare</h2>
          </FadeIn>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FadeIn delay={0.05}>
              <div className="overflow-hidden rounded-xl border border-gray-100 transition-shadow hover:shadow-lg">
                <div className="relative h-[220px] w-full">
                  <Image src="/images/cnc.jpg" alt="CNC de înaltă precizie" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy">CNC de înaltă precizie</h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Tăieri și frezări exacte, cu toleranțe mici și calitate
                    constantă pe fiecare piesă.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="overflow-hidden rounded-xl border border-gray-100 transition-shadow hover:shadow-lg">
                <div className="relative h-[220px] w-full">
                  <Image src="/images/beams.jpg" alt="Lemn uscat și rindeluit" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy">Lemn uscat și rindeluit</h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Lemn C24 și KVH, uscat sub 18% umiditate — stabil, precis,
                    fără deformări.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
