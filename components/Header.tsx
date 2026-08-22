"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "./Icons";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

const navLinks = [
  { label: "Acasă", href: "/" },
  { label: "Case din lemn", href: "/case-din-lemn" },
  { label: "Acoperișuri", href: "/acoperisuri" },
  { label: "Proiecte", href: "/proiecte" },
  { label: "Despre noi", href: "/despre-noi" },
];

export default function Header({ active = "/" }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_20px_rgba(15,27,61,0.08)]" : "border-b border-gray-100"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Sav Haus"
            width={140}
            height={72}
            className="h-11 w-auto object-contain md:h-12"
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

        <div className="flex items-center gap-3 md:gap-6">
          <a
            href="https://www.facebook.com/SavHausSRL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sav Haus pe Facebook"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-graybg hover:text-orange lg:flex"
          >
            <FacebookIcon />
          </a>
          <a
            href="tel:0756943626"
            className="hidden items-center gap-2 text-sm font-semibold text-navy lg:flex"
          >
            <PhoneIcon /> 0756 943 626
          </a>
          <Link
            href="/oferta"
            className="hidden rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-orange/30 transition-colors hover:bg-orange-dark sm:inline-block"
          >
            Cere ofertă
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={menuOpen}
            className="relative flex h-10 w-10 items-center justify-center rounded-md text-navy transition-colors hover:bg-graybg md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-navy transition-all duration-300 ${
                  menuOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-navy transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-navy transition-all duration-300 ${
                  menuOpen ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-gray-100 bg-white px-6 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={
                l.href === active
                  ? "rounded-md bg-orange/10 px-3 py-2.5 text-sm font-bold text-orange"
                  : "rounded-md px-3 py-2.5 text-sm font-semibold text-navy hover:bg-graybg"
              }
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:0756943626"
            className="mt-1 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-navy hover:bg-graybg"
          >
            <PhoneIcon /> 0756 943 626
          </a>
          <Link
            href="/oferta"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-md bg-orange px-3 py-3 text-center text-sm font-bold text-white"
          >
            Cere ofertă
          </Link>
          <a
            href="https://www.facebook.com/SavHausSRL"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-navy hover:bg-graybg"
          >
            <FacebookIcon /> Urmărește-ne pe Facebook
          </a>
        </nav>
      </div>
    </header>
  );
}
