import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfertaForm from "@/components/OfertaForm";
import FadeIn from "@/components/FadeIn";
import { PhoneIcon, MailIcon } from "@/components/Icons";
import { houseModels } from "@/lib/houseModels";

export const metadata = {
  title: "Cere ofertă — Sav Haus",
  description: "Trimite-ne detaliile proiectului tău și primești o estimare în 24 de ore.",
};

export default function OfertaPage({ searchParams }: { searchParams: { model?: string } }) {
  const selectedModel = houseModels.find(model => model.id === searchParams.model);
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="mx-auto max-w-[900px] px-6 py-16 lg:px-10">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange">
            <span className="h-1.5 w-6 rounded bg-orange" /> Cere ofertă
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
            Spune-ne despre proiectul tău
          </h1>
          <p className="mt-3 max-w-xl text-gray-600">
            Completează formularul de mai jos — cererea ajunge direct pe emailul
            nostru și revenim cu o estimare reală în maximum 24 de ore. Pentru
            răspuns imediat, sună-ne direct.
          </p>

          <div className="mt-6 flex flex-wrap gap-6">
            <a href="tel:0756943626" className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange">
              <PhoneIcon /> 0756 943 626
            </a>
            <a href="mailto:office@savhaus.com" className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange">
              <MailIcon /> office@savhaus.com
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 rounded-xl bg-navy p-8 shadow-xl shadow-navy/10">
            {selectedModel && <p className="mb-5 text-sm text-white/80">Model selectat: <strong>Casa {selectedModel.id}</strong> · {selectedModel.area.toLocaleString("ro-RO")} m² utili</p>}
            <OfertaForm initialMessage={selectedModel ? `Doresc o ofertă pentru Casa ${selectedModel.id}, ${selectedModel.area.toLocaleString("ro-RO")} m² utili, regim ${selectedModel.floors}.` : ""} />
          </div>
        </FadeIn>
      </section>

      <Footer showForm={false} />
    </main>
  );
}
