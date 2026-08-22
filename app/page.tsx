import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 4L36 16V36H24V24H16V36H4V16L20 4Z"
          stroke="#F5A319"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div className="leading-none">
        <div className="text-lg font-extrabold tracking-tight text-navy">
          SAV
        </div>
        <div className="text-[10px] font-semibold tracking-[0.25em] text-navy-soft -mt-0.5">
          HAUS
        </div>
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Acasă", href: "#", active: true },
  { label: "Case din lemn", href: "#" },
  { label: "Acoperișuri", href: "#" },
  { label: "Proiecte", href: "#" },
  { label: "Despre noi", href: "#" },
];

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    </svg>
  );
}
function HardHatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M2 18h20" />
      <path d="M12 4v6" />
      <path d="M8 18v-4a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F5A319" strokeWidth="1.8">
      <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9l-6.2 3.4 1.6-6.8L2.2 8.9l6.9-.6L12 2z" />
    </svg>
  );
}
function HouseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F5A319" strokeWidth="1.8">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}
function CheckShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F5A319" strokeWidth="1.8">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F5A319" strokeWidth="1.8">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
function LocationSmallIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function RulerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M7 8v3M11 8v3M15 8v3" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={
                  l.active
                    ? "border-b-2 border-orange pb-1 text-sm font-semibold text-orange"
                    : "text-sm font-semibold text-navy hover:text-orange transition-colors"
                }
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <a
              href="tel:0758123456"
              className="hidden items-center gap-2 text-sm font-semibold text-navy lg:flex"
            >
              <PhoneIcon /> 0758 123 456
            </a>
            <a
              href="#contact"
              className="rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-orange/30 transition-colors hover:bg-orange-dark"
            >
              Cere ofertă
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Construcție casă din lemn cu macara"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/10" />

        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 lg:px-10">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Case pe structură de lemn,
            <br />
            construite pentru generații
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-200 md:text-lg">
            Proiectare, structură și montaj complet. Soluții eficiente
            energetic, adaptate terenului și bugetului tău.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-md bg-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/30 transition-colors hover:bg-orange-dark"
            >
              Solicită estimare
            </a>
            <a
              href="#proiecte"
              className="rounded-md border-2 border-white px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy"
            >
              Vezi proiectele
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
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
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-graybg">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4 lg:px-10">
          <div className="flex items-center gap-4">
            <StarIcon />
            <div>
              <div className="text-xl font-extrabold text-navy">10+</div>
              <div className="text-sm text-gray-500">ani experiență</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HouseIcon />
            <div>
              <div className="text-xl font-extrabold text-navy">120+</div>
              <div className="text-sm text-gray-500">lucrări</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CheckShieldIcon />
            <div>
              <div className="text-lg font-extrabold text-navy">Garanție</div>
              <div className="text-sm text-gray-500">contractuală</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <PinIcon />
            <div>
              <div className="text-lg font-extrabold text-navy">România</div>
            </div>
          </div>
        </div>
      </section>

      {/* CE CONSTRUIM */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <h2 className="mb-8 text-3xl font-extrabold text-navy">Ce construim</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "Case pe structură de lemn", img: "/images/card-case.jpg" },
            { title: "Acoperișuri", img: "/images/card-roof.jpg" },
            { title: "Structuri speciale", img: "/images/card-special.jpg" },
          ].map((card) => (
            <a
              key={card.title}
              href="#"
              className="group relative block h-[280px] overflow-hidden rounded-xl"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                <span className="text-lg font-bold text-white">{card.title}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PROIECTE REALIZATE */}
      <section id="proiecte" className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <h2 className="mb-8 text-3xl font-extrabold text-navy">Proiecte realizate</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: "Aframe Timișoara - M.D.",
              img: "/images/project-aframe-timisoara.jpg",
              location: "Timișoara, TM",
              spec: "Amprentă de 8x11",
            },
            {
              title: "Casă Zălău - R.D.",
              img: "/images/project-casa-zalau.jpg",
              location: "Zălău, SJ",
              spec: "Casă parter (200m²)",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="flex overflow-hidden rounded-xl border border-gray-100"
            >
              <div className="relative h-[170px] w-[220px] flex-shrink-0">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center gap-2 px-6">
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LocationSmallIcon /> {p.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <RulerIcon /> {p.spec}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (minimal, homepage-only build) */}
      <footer id="contact" className="border-t border-gray-100 bg-navy">
        <div className="mx-auto max-w-[1440px] px-6 py-10 text-center lg:px-10">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Sav Haus &middot; office@savhaus.com &middot; 0758 123 456
          </p>
        </div>
      </footer>
    </main>
  );
}
