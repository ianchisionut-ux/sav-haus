"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneIcon } from "./Icons";
import { SAV_LOGO_SRC } from "@/lib/brand";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/case-din-lemn", label: "Case din lemn" },
  { href: "/acoperisuri", label: "Acoperișuri" },
  { href: "/modele-case", label: "Modele de case" },
  { href: "/proiecte", label: "Lucrări" },
  { href: "/despre-noi", label: "Despre noi" },
];

export default function Header({ active = "/" }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = window.scrollY;
      setScrolled((previous) => {
        const next = top > 40;
        return previous === next ? previous : next;
      });
      const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progressRef.current) {
        progressRef.current.style.transform = "scaleX(" + Math.min(1, top / distance) + ")";
      }
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [active]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  return (
    <header className={"sav-header sticky top-0 z-50 border-b transition-all duration-500 " +
      (scrolled || menuOpen
        ? "border-white/10 bg-[#081923]/95 shadow-[0_12px_40px_rgba(4,20,27,.16)] backdrop-blur-2xl"
        : "border-white/15 bg-[#081923]/65 backdrop-blur-xl")}>
      <div className="mx-auto flex h-[72px] w-full max-w-[1480px] items-center justify-between gap-3 px-5 transition-[height] duration-500 sm:px-8 lg:h-[86px] lg:px-12">
        <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Sav Haus — Acasă" className="group flex min-w-[112px] items-center">
          <img src={SAV_LOGO_SRC} width={152} height={78} alt="Sav Haus" className="h-[58px] w-auto max-w-[152px] object-contain transition-transform duration-500 group-hover:scale-[1.035] lg:h-[72px]" />
        </Link>

        <nav aria-label="Navigare principală" className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((link) => {
            const selected = hovered === link.href || (hovered === null && active === link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                aria-current={active === link.href ? "page" : undefined}
                className={"relative isolate px-4 py-3 text-[12px] font-medium tracking-[.035em] transition-colors duration-200 " +
                  (selected ? "text-[#F9982D]" : "text-white/75 hover:text-white")}
              >
                {selected && (
                  <motion.span
                    layoutId="sav-nav-indicator"
                    transition={{ type: "spring", stiffness: 420, damping: 33 }}
                    className="absolute inset-0 -z-10 rounded-[3px] border border-[#F9982D]/30 bg-[#F9982D]/10"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="tel:0756943626" className="hidden items-center gap-2 text-xs font-medium text-white/80 transition-colors hover:text-[#ead1aa] xl:inline-flex">
            <PhoneIcon /> 0756 943 626
          </a>
          <Link href="/oferta" onClick={() => setMenuOpen(false)}
            className="sav-gold-button hidden items-center gap-3 px-5 py-3 text-[11px] font-bold tracking-[.07em] sm:inline-flex">
            Cere ofertă <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={menuOpen}
            aria-controls="sav-mobile-nav"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="relative flex h-[41px] w-[43px] items-center justify-center border border-white/25 text-white lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={"absolute left-0 top-[2px] h-[1.5px] w-full bg-white transition-transform duration-300 " + (menuOpen ? "translate-y-[6px] rotate-45" : "")} />
              <span className={"absolute left-0 top-[8px] h-[1.5px] w-full bg-white transition-opacity duration-200 " + (menuOpen ? "opacity-0" : "")} />
              <span className={"absolute left-0 top-[14px] h-[1.5px] w-full bg-white transition-transform duration-300 " + (menuOpen ? "-translate-y-[6px] -rotate-45" : "")} />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="sav-mobile-nav"
            aria-label="Navigare mobil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .35, ease: [.2, .75, .2, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#081923] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5 sm:px-8">
              {links.map((link, index) => (
                <motion.div key={link.href} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * .035 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}
                    className={"flex items-center justify-between border-b border-white/10 px-2 py-3.5 text-[15px] " + (link.href === active ? "text-[#F9982D]" : "text-white/85")}>
                    {link.label}<span className="text-[#F9982D]" aria-hidden="true">↗</span>
                  </Link>
                </motion.div>
              ))}
              <a href="tel:0756943626" className="mt-3 px-2 py-3 text-sm text-white/70">0756 943 626</a>
              <Link href="/oferta" onClick={() => setMenuOpen(false)} className="sav-gold-button mt-2 py-3 text-center text-xs font-bold">Solicită ofertă</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-[#F9982D]" />
      </div>
    </header>
  );
}
