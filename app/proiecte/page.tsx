import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocationSmallIcon } from "@/components/Icons";

const projects = [
  { title: "Acoperiș Cluj — V.I.", img: "/images/proj-1.jpg", location: "Cluj-Napoca, CJ" },
  { title: "Acoperiș Germania — H.A.", img: "/images/proj-2.jpg", location: "Germania" },
  { title: "Aframe Stârciu — S.O.", img: "/images/proj-3.jpg", location: "Stârciu, SJ" },
  { title: "Carport Stoboru — S.D.", img: "/images/proj-4.jpg", location: "Stoboru, SJ" },
  { title: "Casă Stoboru — P.I.", img: "/images/proj-5.jpg", location: "Stoboru, SJ" },
  { title: "Casă Zălău — V.T.", img: "/images/proj-6.jpg", location: "Zălău, SJ" },
  { title: "Casă Austria — I.E.", img: "/images/proj-7.jpg", location: "Austria" },
  { title: "Casă Lujoj — W.T.", img: "/images/proj-8.jpg", location: "Lujoj" },
  { title: "Aframe Timișoara — M.D.", img: "/images/project-aframe-timisoara.jpg", location: "Timișoara, TM" },
  { title: "Casă Zălău — R.D.", img: "/images/project-casa-zalau.jpg", location: "Zălău, SJ" },
];

export default function Proiecte() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/proiecte" />

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
          <span className="h-1.5 w-6 rounded bg-orange" /> Lucrări executate
        </span>
        <h1 className="mt-4 text-4xl font-extrabold text-navy md:text-5xl">
          14 proiecte publicate
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Case, A-frame, acoperișuri, carport, etajare și galerie — din Cluj,
          Zalău, Stoboru și Timișoara.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <div key={p.title} className="overflow-hidden rounded-xl border border-gray-100">
              <div className="relative h-[160px] w-full">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-navy">{p.title}</h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                  <LocationSmallIcon /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>

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
            className="whitespace-nowrap rounded-md bg-orange px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-dark"
          >
            Cere ofertă →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
