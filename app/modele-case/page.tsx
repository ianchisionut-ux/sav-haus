import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { houseModels, catalogPdf } from "@/lib/houseModels";

export const metadata = {
  title: "8 modele de case | Sav Haus",
  description: "Explorează colecția Sav Haus: 8 case cu suprafețe utile între 61 și 165,11 m², cu planuri de nivel, randări și detalii.",
};

export default function ModelsPage() {
  return (
    <main className="bg-[#f5f2eb] text-[#12252c]">
      <Header active="/modele-case" />
      <section className="relative overflow-hidden bg-[#081923] px-6 pb-20 pt-24 text-white lg:px-10 lg:pb-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{background:"linear-gradient(120deg,#081923 18%,transparent 75%),url('"+houseModels[5].image+"') center / cover"}}/>
        <div className="relative mx-auto max-w-[1360px]">
          <p className="sav-eyebrow">SAV HAUS / COLECȚIA DE CASE / 2026</p>
          <h1 className="sav-display mt-8 max-w-4xl text-6xl leading-[.98] md:text-8xl">Acasă începe <em className="font-normal text-[#F9982D]">cu un plan bun.</em></h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/75">De la un parter compact la o locuință generoasă pe două niveluri. Compară modelele, vezi randările și explorează planurile.</p>
          <div className="mt-10 flex flex-wrap gap-5 text-sm text-white/70"><span>8 modele</span><span>61–165 m² utili</span><span>11 planuri</span></div>
          <a href="#colectie" className="sav-gold-button mt-10 inline-flex px-7 py-4 text-xs font-bold">Explorează modelele <span className="ml-3">↓</span></a>
        </div>
      </section>
      <section id="colectie" className="sav-technical-grid mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
        <SectionDivider index="08" label="Modele arhitecturale" className="mb-6" />
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div><p className="sav-eyebrow">COLECȚIA COMPLETĂ</p><h2 className="sav-display mt-4 text-5xl md:text-7xl">Alege configurația <em>potrivită.</em></h2></div>
          <a href={catalogPdf} target="_blank" rel="noopener noreferrer" className="sav-outline-button inline-flex items-center gap-3 border border-[#2b4344]/30 px-5 py-3 text-xs font-bold">Catalog complet PDF <span>↗</span></a>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          {houseModels.map((m) => (
            <Link key={m.id} href={"/modele-case/"+m.id} className="sav-model-card group block overflow-hidden border border-[#203b40]/10 bg-white">
              <div className="relative aspect-[1.65] overflow-hidden bg-[#ccd5d2]">
                <img src={m.image} alt={"Randare ilustrativă Casa "+m.id} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"/>
                <span className="absolute left-5 top-5 bg-[#081923]/85 px-4 py-2 text-[10px] font-semibold tracking-[.18em] text-white">{m.floors==="P"?"PARTER":m.floors==="P+M"?"PARTER + MANSARDĂ":"PARTER + ETAJ"}</span>
              </div>
              <div className="flex items-start justify-between gap-5 p-6 md:p-8">
                <div><p className="sav-eyebrow">MODELUL {m.id}</p><h3 className="sav-display mt-3 text-4xl">Casa {m.id}</h3><p className="mt-3 text-sm text-[#64756f]">{m.title}</p></div>
                <span aria-hidden="true" className="text-3xl text-[#F9982D] transition-transform group-hover:translate-x-1">↗</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#e2e6df] px-6 py-5 text-xs font-semibold text-[#4e655e] md:px-8"><span>{m.area.toLocaleString("ro-RO",{maximumFractionDigits:2})} m² utili</span><span>{m.bedrooms} {m.bedrooms===1?"dormitor":"dormitoare"}</span><span>{m.floors}</span></div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs leading-6 text-[#667a73]">Randările sunt ilustrative; planurile din catalog sunt informative și nu reprezintă proiecte de execuție. Suprafața Casei 07 necesită verificarea proiectantului.</p>
      </section>
      <Footer />
    </main>
  );
}
