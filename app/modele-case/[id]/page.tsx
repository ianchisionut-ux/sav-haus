import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { houseModels, catalogPdf } from "@/lib/houseModels";
import { levelDetails, formatSquareMeters } from "@/lib/housePlanDetails";

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
      <div className="relative h-[48vh] min-h-[360px] md:h-[72vh]">
        <img src={model.image} alt={"Randare ilustrativă Casa "+model.id} className="h-full w-full object-cover object-center"/>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%]"
          style={{
            background: "linear-gradient(to bottom, rgba(8,25,35,0) 0%, rgba(8,25,35,0.06) 23%, rgba(8,25,35,0.32) 53%, rgba(8,25,35,0.75) 78%, #081923 100%)"
          }}
        />
      </div>
      <div className="relative z-10 mx-auto -mt-28 max-w-[1360px] px-6 lg:px-10">
        <Link href="/modele-case" className="text-xs tracking-widest text-[#F9982D] hover:text-white">← ÎNAPOI LA MODELE</Link>
        <p className="sav-eyebrow mt-9">COLECȚIA SAV HAUS / MODELUL {model.id}</p>
        <h1 className="sav-display mt-4 text-6xl md:text-8xl">Casa <em>{model.id}</em></h1>
        <p className="mt-5 text-lg text-white/80">{model.title}</p>
        <Link href={"/?casa=" + model.id + "#exploreaza"} className="sav-gold-button mt-6 inline-flex items-center gap-6 px-5 py-3 text-xs font-bold">Explorează proprietatea în 3D <span>↗</span></Link>
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
      <div className="mt-12 space-y-10">
        {model.plans.map((plan, levelIndex) => {
          const info = levelDetails[model.id]?.[plan.name];
          return (
            <article
              key={plan.name}
              className="overflow-hidden border border-[#dde3df] bg-white shadow-[0_20px_50px_rgba(8,25,35,.07)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4e8e3] px-6 py-5 md:px-9">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#081923] text-xs font-extrabold text-[#F9982D]">
                    {String(levelIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#88938e]">Casa {model.id} / Plan de nivel</p>
                    <h3 className="mt-1 text-xl font-extrabold text-[#081923]">{plan.name}</h3>
                  </div>
                </div>
                {info && (
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#71827b]">Suprafață utilă a nivelului</p>
                    <p className="mt-1 text-xl font-extrabold tabular-nums text-[#081923]">{formatSquareMeters(info.usefulArea)}</p>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.88fr)]">
                <div className="flex flex-col justify-center bg-white px-5 py-7 md:px-8 md:py-9">
                  <div className="mb-5 flex justify-between gap-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#688078]">
                    <span>Plan arhitectural</span>
                    <span>Fără scară de execuție</span>
                  </div>
                  <img
                    src={plan.image}
                    alt={"Plan " + plan.name.toLowerCase() + " pentru Casa " + model.id}
                    loading="lazy"
                    className="mx-auto h-auto max-h-[760px] w-full object-contain"
                  />
                </div>

                <aside
                  className="border-t border-[#e1e5df] bg-[#faf9f5] px-6 py-7 lg:border-l lg:border-t-0 lg:px-8 lg:py-9"
                  aria-label={"Încăperi și suprafețe " + plan.name}
                >
                  {info ? (
                    <>
                      <div className="mb-7 grid grid-cols-2 gap-x-5 gap-y-4 border-b border-[#dce3dd] pb-7">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#7a8882]">Suprafață desfășurată</p>
                          <p className="mt-2 text-lg font-extrabold tabular-nums text-[#102a33]">{formatSquareMeters(info.developedArea)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#7a8882]">Cote exterioare maxime</p>
                          <p className="mt-2 text-[15px] font-extrabold text-[#102a33]">{info.exteriorDimensions}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h4 className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#081923]">
                          Încăperi / Suprafețe
                        </h4>
                        <span className="h-px w-8 bg-[#F9982D]" aria-hidden="true" />
                      </div>
                      <dl className="divide-y divide-[#e1e5de]">
                        {info.rooms.map(([room, sqm], roomIndex) => (
                          <div key={room + "-" + roomIndex} className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-[13px] font-medium leading-5 text-[#43564e]">{room}</dt>
                            <dd className="shrink-0 text-[14px] font-extrabold tabular-nums text-[#102a33]">{formatSquareMeters(sqm)}</dd>
                          </div>
                        ))}
                      </dl>

                      {info.separate && info.separate.length > 0 && (
                        <div className="mt-6 border-t border-[#dce3dd] pt-5">
                          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#a76d2c]">
                            Suprafețe evidențiate separat
                          </p>
                          <dl>
                            {info.separate.map(([room, sqm], separateIndex) => (
                              <div key={room + "-" + separateIndex} className="flex justify-between gap-4 py-2">
                                <dt className="text-[13px] text-[#43564e]">{room}</dt>
                                <dd className="shrink-0 text-[14px] font-bold tabular-nums text-[#102a33]">{formatSquareMeters(sqm)}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}

                      {info.note && (
                        <p className={"mt-6 border-l-2 p-4 text-[12px] leading-[1.7] " +
                          (info.discrepancy
                            ? "border-[#F9982D] bg-[#fff2e0] text-[#76502b]"
                            : "border-[#aab8b0] bg-[#eef1eb] text-[#5a6b63]")}>
                          {info.note}
                        </p>
                      )}

                      <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#dce3dd] pt-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#72827b]">
                        <span>Sursa: Catalog SAV HAUS 2026</span>
                        <span>Pagina {String(info.sourcePage).padStart(2, "0")}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm leading-7 text-[#63766e]">
                      Pentru acest nivel, informațiile despre încăperi nu sunt disponibile în centralizatorul catalogului.
                    </p>
                  )}
                </aside>
              </div>
            </article>
          );
        })}
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
