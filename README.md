# Sav Haus — Site complet (Next.js + Tailwind)

Site de prezentare cu 5 pagini + formular de ofertă care trimite automat
email, construit pe stack-ul tău obișnuit (Next.js, TypeScript, Tailwind,
gata de Vercel).

## Pagini

- `/` — Acasă
- `/case-din-lemn` — Timber frame
- `/acoperisuri` — Acoperișuri
- `/proiecte` — Portofoliu (14 proiecte)
- `/despre-noi` — Despre companie
- `/oferta` — Formular complet de cerere ofertă

Formularul de ofertă apare și compact în footer, pe toate paginile.

## Rulare locală

```bash
npm install
npm run dev
```

## ⚠️ Activarea trimiterii automate de email (obligatoriu)

Formularul "Cere ofertă" trimite emailul prin [Resend](https://resend.com) —
un serviciu de email tranzacțional, gratuit până la 3000 emailuri/lună,
folosit și la celelalte proiecte ale tale (Dracula's Soil, Signal etc).

**Pași:**

1. Creează cont gratuit pe https://resend.com și confirmă emailul.
2. Din dashboard, mergi la **API Keys** → **Create API Key** → copiază cheia
   (începe cu `re_...`).
3. (Opțional, dar recomandat) Adaugă și verifică domeniul `sav-haus.ro` la
   **Domains** în Resend, ca emailurile să plece de pe adresa ta, nu de pe
   domeniul de test al lor. Durează câteva minute — Resend îți dă niște
   înregistrări DNS (TXT/MX) de adăugat la domeniul tău.
4. În proiectul Vercel → **Settings** → **Environment Variables**, adaugă:

   | Nume | Valoare |
   |---|---|
   | `RESEND_API_KEY` | cheia copiată la pasul 2 |
   | `OFERTA_DESTINATION_EMAIL` | `office@savhaus.com` (unde ajung cererile) |
   | `OFERTA_FROM_EMAIL` | `Sav Haus <oferta@sav-haus.ro>` (dacă ai verificat domeniul; altfel lasă implicit) |

5. Redeploy (Vercel face asta automat la următorul push, sau apeși
   "Redeploy" manual din dashboard).

**Fără `RESEND_API_KEY` setat, formularul afișează un mesaj de eroare clar**
(nu trimite emailul "în gol" și nu se preface că a mers) — testat local, îl
poți verifica rulând `npm run dev` și încercând formularul înainte să pui
cheia.

## Ce conține

- `app/page.tsx` — homepage
- `app/*/page.tsx` — celelalte 4 pagini de conținut
- `app/api/oferta/route.ts` — endpoint-ul care trimite emailul prin Resend
- `components/OfertaForm.tsx` — formularul (folosit compact în footer și
  complet pe pagina `/oferta`)
- `components/Header.tsx`, `components/Footer.tsx` — navigare + footer comune
- `public/images/logo.png` — logo-ul tău real
- `public/images/*.jpg` — pozele reale din catalogul PDF

## Paleta de culori

Definită în `tailwind.config.ts`: navy `#0F1B3D`, orange `#F5A319`.

## Pagini individuale de proiect

Fiecare proiect din portofoliu are acum pagina lui proprie, cu galerie de
poze proprie și lightbox: `/proiecte/[slug]` (ex: `/proiecte/casa-zalau-rotaru`).

- Datele tuturor celor 14 proiecte sunt în `lib/projects.ts` — editezi acolo
  titlul, locația, descrierea sau pozele fiecărui proiect.
- Pozele sunt în `public/images/projects/`, denumite `[slug]-1.jpg`,
  `[slug]-2.jpg` etc.
- Pentru a adăuga un proiect nou: adaugi o intrare nouă în `lib/projects.ts`
  și pui pozele corespunzătoare în `public/images/projects/` — pagina se
  generează automat, nu trebuie creat niciun fișier nou.
- Momentan majoritatea proiectelor au 1-2 poze (atât am putut extrage din
  catalogul PDF pe care mi l-ai trimis) — poți adăuga oricâte poze noi vrei
  per proiect, doar completezi array-ul `images` din `lib/projects.ts`.

## Upgrade UI/UX (ultima rundă)

- **Meniu mobil** — lipsea complet înainte; acum e un hamburger funcțional
  cu panou glisant, pe toate paginile.
- **Header inteligent** — capătă umbră fină la scroll, sticky pe toate
  paginile.
- **Animații la scroll** — secțiunile apar cu fade-in/slide-in discret pe
  măsură ce dai scroll (folosind `framer-motion`), pe toate paginile.
- **Micro-interacțiuni** — hover-uri cu ridicare ușoară pe butoane, zoom mai
  lent și mai natural pe imagini, umbre colorate la hover pe carduri.
- **Formular de ofertă îmbunătățit** — spinner de încărcare, mesaj de succes
  animat, focus states mai clare pe câmpuri.
- **Breadcrumb** pe fiecare pagină de proiect (Acasă / Proiecte / Nume proiect).
- **Favicon real** — generat automat din logo-ul tău (`app/icon.png`).
- **Loading skeleton** — se afișează un placeholder discret în timp ce se
  încarcă o pagină nouă, în loc de ecran alb.

Nu am schimbat structura de conținut sau pozele — doar polish vizual și
funcțional peste ce exista deja.
