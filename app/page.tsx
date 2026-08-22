import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ShieldIcon,
  HardHatIcon,
  ChatIcon,
  StarIcon,
  HouseIcon,
  CheckShieldIcon,
  PinIcon,
  ArrowIcon,
  LocationSmallIcon,
  RulerIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/" />

      {/* HERO */}
      <section className="relative h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Construcție casă din lemn cu macara"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/10" />

        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 lg:px-10">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Case pe structură de lemn,
            <br />
            construite pentru generații
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-200 md:text-lg">
            Proiectare, structură și montaj complet. Soluții eficiente
            energetic, adaptate terenului și bugetului tău.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/oferta"
              className="rounded-md bg-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/30 transition-colors hover:bg-orange-dark"
            >
              Solicită estimare
            </Link>
            <Link
              href="/proiecte"
              className="rounded-md border-2 border-white px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy"
            >
              Vezi proiectele
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <ShieldIcon /> Firmă autorizată
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <HardHatIcon /> Execuție specializată
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <ChatIcon /> Consultanță tehnică
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-graybg">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4 lg:px-10">
          <div className="flex items-center gap-4">
            <StarIcon />
            <div>
              <div className="text-xl font-extrabold text-navy">10+</div>
              <div className="text-sm text-gray-500">ani experiență</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HouseIcon />
            <div>
              <div className="text-xl font-extrabold text-navy">14+</div>
              <div className="text-sm text-gray-500">proiecte publicate</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CheckShieldIcon />
            <div>
              <div className="text-lg font-extrabold text-navy">Garanție</div>
              <div className="text-sm text-gray-500">contractuală</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <PinIcon />
            <div>
              <div className="text-lg font-extrabold text-navy">România</div>
            </div>
          </div>
        </div>
      </section>

      {/* CE CONSTRUIM */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <h2 className="mb-8 text-3xl font-extrabold text-navy">Ce construim</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "Case pe structură de lemn", img: "/images/card-case.jpg", href: "/case-din-lemn" },
            { title: "Acoperișuri", img: "/images/card-roof.jpg", href: "/acoperisuri" },
            { title: "Structuri speciale", img: "/images/card-special.jpg", href: "/proiecte" },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative block h-[280px] overflow-hidden rounded-xl"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                <span className="text-lg font-bold text-white">{card.title}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROIECTE REALIZATE */}
      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-navy">Proiecte realizate</h2>
          <Link href="/proiecte" className="text-sm font-bold text-orange hover:text-orange-dark">
            Vezi toate proiectele →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: "Aframe Timișoara - M.D.",
              img: "/images/project-aframe-timisoara.jpg",
              location: "Timișoara, TM",
              spec: "Amprentă de 8x11",
            },
            {
              title: "Casă Zălău - R.D.",
              img: "/images/project-casa-zalau.jpg",
              location: "Zălău, SJ",
              spec: "Casă parter (200m²)",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="flex overflow-hidden rounded-xl border border-gray-100"
            >
              <div className="relative h-[170px] w-[220px] flex-shrink-0">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center gap-2 px-6">
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LocationSmallIcon /> {p.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <RulerIcon /> {p.spec}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
