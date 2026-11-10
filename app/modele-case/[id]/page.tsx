import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { houseModels, catalogPdf } from "@/lib/houseModels";

export function generateStaticParams() {
  return houseModels.map((model) => ({ id: model.id }));
}
export function generateMetadata({params}:{params:{id:string}}) {
  const model=houseModels.find(m=>m.id===params.id);
  return {title:model?"Casa "+model.id+" | Sav Haus":"Model de casă | Sav Haus",description:model?.description};
}
export default function HouseModelDetail({params}:{params:{id:string}}) {
  const model=houseModels.find(m=>m.id===params.id);
  if(!model) notFound();
  return <main className="bg-[#f5f2eb] text-[#12252c]">
    <Header active="/modele-case"/>
    <section className="relative overflow-hidden bg-[#081923] pb-16 text-white">
      <div className="relative h-[42vh] min-h-[300px] md:h-[65vh]">
        <img src={model.image} alt={"Randare ilustrativă Casa "+model.id} className="h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#081923]/80 via-[#081923]/5 to-transparent"/>
      </div>
      <div className="relative z-10 mx-auto -mt-28 max-w-[1360px] px-6 lg:px-10">
        <Link href="/modele-case" className="text-xs tracking-widest text-[#F9982D] hover:text-white">← ÎNAPOI LA MODELE</Link>
        <p className="sav-eyebrow mt-9">COLECȚIA SAV HAUS / MODELUL {model.id}</p>
        <h1 className="sav-display mt-4 text-6xl md:text-8xl">Casa <em>{model.id}</em></h1>
        <p className="mt-5 text-lg text-white/80">{model.title}</p>
        <div className="mt-10 grid max-w-4xl grid-cols-2 gap-7 border-t border-white/20 pt-7 md:grid-cols-4">
          {[
            [model.area.toLocaleString("ro-RO",{maximumFractionDigits:2})+" m²","Suprafață utilă"],
            [model.built.toLocaleString("ro-RO",{maximumFractionDigits:2})+" m²","Suprafață desfășurată"],
            [model.floors,"Regim"],
            [String(model.bedrooms),"Dormitoare"],
          ].map(([value,label])=><div key={label}><div className="sav-display text-3xl md:text-4xl">{value}</div><div className="mt-2 text-[11px] uppercase tracking-[.12em] text-[#bacbc7]">{label}</div></div>)}
        </div>
      </div>
    </section>
    <section className="sav-technical-grid mx-auto max-w-[1360px] px-6 py-20 lg:px-10">
      <SectionDivider index={model.id} label="Compartimentare și planuri" className="mb-6" />
      <p className="sav-eyebrow">MODELUL {model.id} / COMPARTIMENTARE</p>
      <h2 className="sav-display mt-4 text-5xl md:text-7xl">Gândită pentru <em>viața de zi cu zi.</em></h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#60756d]">{model.description}</p>
      {model.areaNote&&<p className="mt-5 max-w-3xl border-l-2 border-[#F9982D] bg-[#e9e2d4] p-5 text-sm leading-7">{model.areaNote}</p>}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {model.plans.map((plan)=><div key={plan.name} className="overflow-hidden bg-white p-5 shadow-[0_15px_45px_rgba(20,50,50,.06)] md:p-8">
          <div className="mb-6 flex justify-between text-xs font-semibold uppercase tracking-[.15em]"><span>{plan.name}</span><span>PLAN DE NIVEL</span></div>
          <img src={plan.image} alt={"Plan "+plan.name.toLowerCase()+" pentru Casa "+model.id} loading="lazy" className="mx-auto h-auto w-full object-contain"/>
        </div>)}
      </div>
      <p className="mt-7 text-xs text-[#63766e]">Suprafețe și imagini din catalogul Sav Haus 2026. Planurile sunt informative, fără scară de execuție.</p>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/oferta" className="sav-gold-button inline-flex px-7 py-4 text-sm font-bold">Solicită ofertă pentru Casa {model.id} ↗</Link>
        <a href={catalogPdf} target="_blank" rel="noopener noreferrer" className="sav-outline-button inline-flex border border-[#19363a]/30 px-7 py-4 text-sm font-bold">Vezi catalogul integral ↗</a>
      </div>
    </section>
    <Footer/>
  </main>;
}
