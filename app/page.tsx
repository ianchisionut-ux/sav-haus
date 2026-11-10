import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import FadeIn from "@/components/FadeIn";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import { projects } from "@/lib/projects";
import {
  ShieldIcon,
  HardHatIcon,
  ChatIcon,
  StarIcon,
  HouseIcon,
  CheckIcon,
  HandshakeIcon,
  CheckShieldIcon,
  PinIcon,
  ArrowIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header active="/" />

      {/* HERO — filmul se derulează controlat prin scroll, lent */}
      <section id="hero-film" className="relative h-[440svh] w-full bg-[#081923]">
        <div className="sticky top-[72px] h-[calc(100svh-72px)] min-h-[500px] overflow-hidden lg:top-[86px] lg:h-[calc(100svh-86px)]">
          <HeroScrollVideo />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#081923]/95 via-[#081923]/65 to-[#081923]/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081923]/75 via-transparent to-[#081923]/10" />
          <div className="pointer-events-none absolute inset-0 opacity-[.08]" style={{ backgroundSize: "90px 90px", backgroundImage: "linear-gradient(#dce9e5 1px,transparent 1px),linear-gradient(90deg,#dce9e5 1px,transparent 1px)", maskImage: "linear-gradient(to right,black,transparent 70%)" }} />
          <div className="relative mx-auto flex h-full max-w-[1480px] flex-col justify-center px-5 pb-16 pt-9 sm:px-8 lg:px-12">
            <div className="mb-5 flex items-center gap-4 text-[10px] font-bold tracking-[.24em] text-[#dfc49a] sm:mb-7">
              <span className="h-px w-10 bg-[#d4b78d]" /> SAV HAUS / CONSTRUCȚII DIN LEMN
            </div>
            <h1 className="sav-display max-w-[940px] text-[clamp(48px,7.4vw,108px)] leading-[.98] tracking-[-.06em] text-white">
              Construim case.<br /><em className="font-normal text-[#e5c99d]">Creăm acasă.</em>
            </h1>
            <p className="mt-6 max-w-[520px] text-[14px] leading-[1.85] text-[#d8e2df] md:mt-9 md:text-[16px]">
              Case pe structură de lemn, acoperișuri și structuri speciale. De la proiectare la montaj, fiecare detaliu contează.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
              <Link href="/modele-case" className="sav-gold-button inline-flex items-center gap-6 px-6 py-4 text-xs font-bold">Descoperă modelele <span aria-hidden="true">↗</span></Link>
              <Link href="/proiecte" className="sav-outline-light inline-flex items-center gap-6 px-6 py-4 text-xs font-bold">Lucrări realizate <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="mt-9 flex max-w-[700px] flex-wrap gap-x-7 gap-y-4 border-t border-white/25 pt-6 text-[11px] tracking-[.07em] text-white/80 sm:mt-12">
              <span className="flex items-center gap-2"><ShieldIcon /> Firmă autorizată</span>
              <span className="flex items-center gap-2"><HardHatIcon /> Execuție specializată</span>
              <span className="flex items-center gap-2"><ChatIcon /> Consultanță tehnică</span>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-7 left-5 right-5 flex items-center justify-between text-[10px] font-semibold tracking-[.2em] text-white/75 sm:left-8 sm:right-8 lg:left-12 lg:right-12">
            <span>DERULEAZĂ PENTRU A EXPLORA</span><span>01 / CONSTRUCȚIA</span>
          </div>
        </div>
      </section>

      {/* MODELELE SAV HAUS — documentație din catalogul furnizat */}
      <section className="sav-collection-section bg-[#f5f2eb] px-6 py-20 text-[#12252c] lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
            <div><p className="sav-eyebrow">COLECȚIA DE CASE / 2026</p><h2 className="sav-display mt-5 text-[clamp(44px,6vw,86px)] leading-[1.03]">Acasă începe<br /><em>cu un plan bun.</em></h2></div>
            <div className="max-w-[330px]"><p className="text-sm leading-7 text-[#687c76]">8 modele, de la parter compact la case generoase cu mansardă sau etaj. Planuri și randări într-un singur loc.</p><Link href="/modele-case" className="mt-5 inline-flex items-center gap-6 border-b border-[#203d40] pb-2 text-xs font-bold tracking-[.07em]">Vezi toate cele 8 modele <span>↗</span></Link></div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { id: "01", area: "61 m²", tag: "PARTER", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/abfc2c7c-c0ef-4f27-b70d-61eb8de47a35.jpg" },
              { id: "06", area: "105 m²", tag: "PARTER + MANSARDĂ", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/4d673112-25f6-4395-9921-b42276926b90.jpg" },
              { id: "08", area: "165,11 m²", tag: "PARTER + ETAJ", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/68c7bf8f-2ddd-4b6e-9030-ff02065c8183.jpg" },
            ].map((model) => (
              <Link href={"/modele-case/" + model.id} key={model.id} className="sav-model-card group overflow-hidden bg-white">
                <div className="relative aspect-[1.35] overflow-hidden"><img src={model.image} loading="lazy" alt={"Randare ilustrativă Casa "+model.id} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"/><span className="absolute left-4 top-4 bg-[#081923]/85 px-3 py-2 text-[9px] tracking-[.15em] text-white">{model.tag}</span></div>
                <div className="flex items-center justify-between p-6"><div><span className="sav-eyebrow">MODELUL {model.id}</span><h3 className="sav-display mt-2 text-4xl">Casa {model.id}</h3><p className="mt-1 text-xs text-[#667c73]">{model.area} utili</p></div><span className="text-2xl text-[#ba9d73]">↗</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#eae8df]">
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
                  <div className="sav-display text-[30px] text-[#12252c]">{s.big}</div>
                  {s.small && <div className="text-sm text-gray-500">{s.small}</div>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CE CONSTRUIM */}
      <section className="sav-services-section mx-auto max-w-[1440px] px-6 py-20 lg:px-10 md:py-28">
        <FadeIn>
          <h2 className="sav-display mb-10 text-5xl text-[#12252c] md:text-7xl">Ce construim</h2>
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
                className="group relative block h-[360px] overflow-hidden shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy/10"
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
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-8 lg:px-10">
        <FadeIn>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="sav-display text-5xl text-[#12252c] md:text-7xl">Proiecte realizate</h2>
            <Link href="/proiecte" className="text-sm font-bold text-orange transition-colors hover:text-orange-dark">
              Vezi toate proiectele →
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ProjectsGrid projects={projects.slice(0, 4)} />
        </FadeIn>
      </section>

      {/* DE CE SAV HAUS */}
      <section className="mx-auto max-w-[1440px] px-6 pb-28 lg:px-10">
        <FadeIn>
          <div className="bg-[#102b35] p-8 md:p-14">
            <h2 className="sav-display text-5xl text-white md:text-7xl">
              De ce Sav Haus?
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  text: "Nu ne limităm la metodele clasice. Combinăm măiestria dulgheriei tradiționale cu tehnologii moderne de proiectare și execuție. Rezultatul? Acoperișuri și structuri din lemn care nu doar arată bine, ci sunt calculate să reziste la intemperii și trecerea timpului, oferindu-ți siguranța de care ai nevoie.",
                  icon: <HouseIcon />,
                  label: "Rezistență",
                },
                {
                  text: "Spre deosebire de firmele care fac „de toate\u201d, noi am ales să fim cei mai buni pe nișa noastră. De ani de zile, facem exclusiv construcții din lemn și acoperișuri. Această specializare ne-a permis să cunoaștem secretele lemnului în detaliu, astfel încât să anticipăm orice provocare tehnică și să oferim soluții de montaj impecabile.",
                  icon: <CheckIcon />,
                  label: "Experiență",
                },
                {
                  text: "Suntem o firmă autorizată, ceea ce înseamnă că lucrăm profesional, curat și cu responsabilitate. Deși oferim standarde înalte de execuție, ne menținem tarifele competitive. Alegând SAV HAUS, beneficiezi de raportul corect între prețul investit și durabilitatea lucrării, fără compromisuri.",
                  icon: <HandshakeIcon />,
                  label: "Calitate/Preț",
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div className="flex h-full flex-col justify-between bg-white/95 p-7">
                    <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
                    <div className="mt-6 flex items-center gap-3">
                      {item.icon}
                      <span className="text-base font-bold text-navy">{item.label}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 text-center">
            <h3 className="text-xl font-extrabold text-navy md:text-2xl">
              Construcții din lemn realizate cu profesionalism și atenție la
              detalii.
            </h3>
            <Link
              href="/oferta"
              className="sav-gold-button mt-6 inline-block px-7 py-4 text-sm font-bold"
            >
              Cere o ofertă
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
