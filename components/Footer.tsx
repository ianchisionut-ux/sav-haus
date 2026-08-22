import Image from "next/image";
import Link from "next/link";
import OfertaForm from "./OfertaForm";
import { PhoneIcon, MailIcon, MapPinIcon } from "./Icons";

export default function Footer({ showForm = true }: { showForm?: boolean }) {
  return (
    <footer id="contact" className="bg-navy">
      <div className={showForm ? "mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10" : "mx-auto max-w-[1440px] px-6 py-16 lg:px-10"}>
        <div>
          <h2 className="text-3xl font-extrabold text-white">
            Hai să vorbim despre casa ta.
          </h2>
          <p className="mt-4 max-w-md text-gray-300">
            Trimite-ne câteva detalii despre teren și buget — revenim cu o
            estimare reală în maximum 24 de ore.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a href="tel:0756943626" className="flex items-center gap-3 text-white">
              <PhoneIcon /> 0756 943 626
            </a>
            <a href="mailto:office@savhaus.com" className="flex items-center gap-3 text-white">
              <MailIcon /> office@savhaus.com
            </a>
            <div className="flex items-center gap-3 text-white">
              <MapPinIcon /> DC79 17, Stârciu 457187
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 opacity-80">
            <Image src="/images/logo.png" alt="Sav Haus" width={100} height={52} className="h-9 w-auto brightness-0 invert" />
          </div>
        </div>

        {showForm && (
          <div>
            <OfertaForm />
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-gray-400 lg:px-10">
          <p>© {new Date().getFullYear()} Sav Haus. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white">Acasă</Link>
            <Link href="/proiecte" className="hover:text-white">Proiecte</Link>
            <Link href="/despre-noi" className="hover:text-white">Despre noi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
