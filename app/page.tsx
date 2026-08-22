import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/projects";
import {
  ShieldIcon,
  HardHatIcon,
  ChatIcon,
  StarIcon,
  HouseIcon,
  CheckShieldIcon,
  PinIcon,
  ArrowIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/" />

      {/* HERO */}
      <section className="relative h-[560px] w-full overflow-hidden md:h-[600px]">
        <Image
          src="/images/hero.jpg"
          alt="Construcție casă din lemn cu macara"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/60 to-navy/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 lg:px-10">
          <FadeIn>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Case pe structură de lemn,
              <br />
              construite pentru generații
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-200 md:text-lg">
              Proiectare, structură și montaj complet. Soluții eficiente
              energetic, adaptate terenului și bugetului tău.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/oferta"
                className="rounded-md bg-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/30 transition-all hover:-translate-y-0.5 hover:bg-orange-dark hover:shadow-xl hover:shadow-orange/40"
              >
                Solicită estimare
              </Link>
              <Link
                href="/proiecte"
                className="rounded-md border-2 border-white px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-navy"
              >
                Vezi proiectele
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
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
          </FadeIn>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-graybg">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4 lg:px-10">
          {[
            { icon: <StarIcon />, big: "10+", small: "ani experiență" },
            { icon: <HouseIcon />, big: "14+", small: "proiecte publicate" },
            { icon: <CheckShieldIcon />, big: "Garanție", small: "contractuală" },
            { icon: <PinIcon />, big: "România", small: null },
          ].map((s, i) => (
            <FadeIn key={s.big} delay={i * 0.06}>
              <div className="flex items-center gap-4">
                {s.icon}
                <div>
                  <div className="text-xl font-extrabold text-navy">{s.big}</div>
                  {s.small && <div className="text-sm text-gray-500">{s.small}</div>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CE CONSTRUIM */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 md:py-20">
        <FadeIn>
          <h2 className="mb-8 text-3xl font-extrabold text-navy">Ce construim</h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "Case pe structură de lemn", img: "/images/card-case.jpg", href: "/case-din-lemn" },
            { title: "Acoperișuri", img: "/images/card-roof.jpg", href: "/acoperisuri" },
            { title: "Structuri speciale", img: "/images/card-special.jpg", href: "/proiecte" },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1}>
              <Link
                href={card.href}
                className="group relative block h-[280px] overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy/10"
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent transition-opacity group-hover:from-navy/90" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="text-lg font-bold text-white">{card.title}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROIECTE REALIZATE */}
      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <FadeIn>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-navy">Proiecte realizate</h2>
            <Link href="/proiecte" className="text-sm font-bold text-orange transition-colors hover:text-orange-dark">
              Vezi toate proiectele →
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ProjectsGrid projects={projects.slice(0, 4)} />
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
