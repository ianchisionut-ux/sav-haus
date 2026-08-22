import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "./Icons";

const navLinks = [
  { label: "Acasă", href: "/" },
  { label: "Case din lemn", href: "/case-din-lemn" },
  { label: "Acoperișuri", href: "/acoperisuri" },
  { label: "Proiecte", href: "/proiecte" },
  { label: "Despre noi", href: "/despre-noi" },
];

export default function Header({ active = "/" }: { active?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Sav Haus"
            width={140}
            height={72}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={
                l.href === active
                  ? "border-b-2 border-orange pb-1 text-sm font-semibold text-orange"
                  : "text-sm font-semibold text-navy transition-colors hover:text-orange"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="tel:0756943626"
            className="hidden items-center gap-2 text-sm font-semibold text-navy lg:flex"
          >
            <PhoneIcon /> 0756 943 626
          </a>
          <Link
            href="/oferta"
            className="rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-orange/30 transition-colors hover:bg-orange-dark"
          >
            Cere ofertă
          </Link>
        </div>
      </div>
    </header>
  );
}
