# Sav Haus — Homepage (Next.js + Tailwind)

Recreare a homepage-ului după designul din poza trimisă: header cu navigație,
hero cu poză de fundal (macara + structură lemn), bară de statistici, secțiunea
"Ce construim" (3 carduri cu imagine) și "Proiecte realizate".

## Rulare locală

```bash
npm install
npm run dev
```

Apoi deschide http://localhost:3000

## Deploy pe Vercel

```bash
vercel
```

sau conectează repo-ul din dashboard-ul Vercel — nu are nevoie de nicio
variabilă de mediu, e un site 100% static.

## Ce conține

- `app/page.tsx` — tot homepage-ul (header, hero, stats, carduri, proiecte, footer)
- `app/layout.tsx` — layout global + metadata SEO
- `public/images/` — pozele reale extrase din catalogul tău PDF (le poți
  înlocui oricând cu poze noi, păstrând aceleași nume de fișier)
- Paleta de culori (navy `#0F1B3D`, orange `#F5A319`) e definită în
  `tailwind.config.ts` — modifici acolo dacă vrei să ajustezi nuanțele

## De completat

Ai cerut doar homepage-ul deocamdată. Linkurile din navigație
(Case din lemn, Acoperișuri, Proiecte, Despre noi) și butonul "Cere ofertă"
sunt pregătite dar duc încă spre `#` — le facem pagini reale când vrei să
continuăm cu restul site-ului.

## Notă despre font

Am folosit stack-ul de fonturi de sistem (`-apple-system, Segoe UI, Roboto...`)
în loc să încarc Inter din Google Fonts la build, ca să nu depindă build-ul de
un fetch extern. Dacă vrei exact Inter, adaugă în `app/layout.tsx`:

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

și pune `className={inter.className}` pe `<body>`.
