export type ProjectDetail = {
  slug: string;
  title: string;
  category: string;
  location: string;
  spec: string;
  description: string;
  images: string[];
};

export const projects: ProjectDetail[] = [
  {
    slug: "acoperis-cluj-vi",
    title: "Acoperiș Cluj — V.I.",
    category: "Acoperiș",
    location: "Cluj-Napoca, CJ",
    spec: "Structură acoperiș",
    description:
      "Lucrare documentată prin fotografii, de la ridicarea structurii până la montajul final. Structură configurată exact pentru geometria clădirii.",
    images: [
      "/images/projects/acoperis-cluj-vi-1.jpg",
      "/images/projects/acoperis-cluj-vi-2.jpg",
    ],
  },
  {
    slug: "acoperis-germania-ha",
    title: "Acoperiș Germania — H.A.",
    category: "Acoperiș",
    location: "Germania",
    spec: "Structură acoperiș",
    description:
      "Proiect livrat în afara țării, cu aceleași standarde de execuție și control al calității ca pe orice șantier din portofoliu.",
    images: [
      "/images/projects/acoperis-germania-ha-1.jpg",
      "/images/projects/acoperis-germania-ha-2.jpg",
    ],
  },
  {
    slug: "acoperis-starciu-ci",
    title: "Acoperiș Stârciu — C.I.",
    category: "Acoperiș",
    location: "Stârciu, SJ",
    spec: "Structură acoperiș",
    description:
      "Structură de acoperiș ridicată etapizat, cu verificarea geometriei la fiecare fază de montaj.",
    images: [
      "/images/projects/acoperis-starciu-ci-1.jpg",
      "/images/projects/acoperis-starciu-ci-2.jpg",
    ],
  },
  {
    slug: "aframe-starciu-so",
    title: "Aframe Stârciu — S.O.",
    category: "A-frame",
    location: "Stârciu, SJ",
    spec: "Volum A-frame",
    description:
      "Volum A-frame din portofoliul public — geometrie triunghiulară ridicată pe structură de lemn masiv.",
    images: [
      "/images/projects/aframe-starciu-so-1.jpg",
      "/images/projects/aframe-starciu-so-2.jpg",
    ],
  },
  {
    slug: "aframe-timisoara-md",
    title: "Aframe Timișoara — M.D.",
    category: "A-frame",
    location: "Timișoara, TM",
    spec: "Amprentă de 8×11 m",
    description:
      "A-frame cu amprentă de 8×11 m, structură pe lemn masiv și acoperiș coborât până la sol pentru un profil compact.",
    images: [
      "/images/projects/aframe-timisoara-md-1.jpg",
      "/images/projects/aframe-timisoara-md-2.jpg",
    ],
  },
  {
    slug: "carport-stoboru-sd",
    title: "Carport Stoboru — S.D.",
    category: "Structuri speciale",
    location: "Stoboru, SJ",
    spec: "Protecție auto",
    description:
      "Protecție auto pe structură din lemn, cu acoperiș extins și grindă principală vizibilă ca element de design.",
    images: [
      "/images/projects/carport-stoboru-sd-1.jpg",
      "/images/projects/carport-stoboru-sd-2.jpg",
    ],
  },
  {
    slug: "casa-austria-ie",
    title: "Casă Austria — I.E.",
    category: "Casă",
    location: "Austria",
    spec: "Locuință finalizată",
    description:
      "Imagini de ansamblu din etapele finale de execuție — locuință pe structură de lemn, livrată la standardele pieței austriece.",
    images: ["/images/projects/casa-austria-ie-1.jpg"],
  },
  {
    slug: "casa-lujoj-wt",
    title: "Casă Lujoj — W.T.",
    category: "Casă",
    location: "Lujoj",
    spec: "Timber frame",
    description:
      "Fotografii din evoluția lucrării — casă pe structură timber frame, cu balcoane și deschideri mari spre exterior.",
    images: [
      "/images/projects/casa-lujoj-wt-1.jpg",
      "/images/projects/casa-lujoj-wt-2.jpg",
    ],
  },
  {
    slug: "casa-stoboru-pi",
    title: "Casă Stoboru — P.I.",
    category: "Casă",
    location: "Stoboru, SJ",
    spec: "Structură din lemn documentată",
    description:
      "Structură din lemn documentată în etapele de execuție, de la ridicarea pereților până la finisajele exterioare.",
    images: ["/images/projects/casa-stoboru-pi-1.jpg"],
  },
  {
    slug: "casa-tureni-sr",
    title: "Casă Tureni — S.R.",
    category: "Casă",
    location: "Tureni, CJ",
    spec: "Locuință publicată în galerie",
    description:
      "Locuință publicată în galeria Sav Haus — montaj realizat cu macara, pentru precizie și rapiditate pe șantier.",
    images: ["/images/projects/casa-tureni-sr-1.jpg"],
  },
  {
    slug: "casa-zalau-rotaru",
    title: "Casă Zălău — Rotaru",
    category: "Casă",
    location: "Zalău, SJ",
    spec: "Casă parter (200 m²)",
    description:
      "Casă parter cu suprafața de 200 m², acoperiș cu geometrie multiplă și volume distincte pentru fiecare zonă a locuinței.",
    images: [
      "/images/projects/casa-zalau-rotaru-1.jpg",
      "/images/projects/casa-zalau-rotaru-2.jpg",
    ],
  },
  {
    slug: "casa-zalau-vt",
    title: "Casă Zălău — V.T.",
    category: "Casă",
    location: "Zalău, SJ",
    spec: "Etape succesive ale structurii",
    description:
      "Etape succesive ale structurii, documentate din faza de ridicare a pereților până la casa finalizată.",
    images: [
      "/images/projects/casa-zalau-vt-1.jpg",
      "/images/projects/casa-zalau-vt-2.jpg",
    ],
  },
  {
    slug: "etaj-stoboru-sd",
    title: "Etaj Stoboru — S.D.",
    category: "Structuri speciale",
    location: "Stoboru, SJ",
    spec: "Extindere pe verticală",
    description:
      "Extindere pe verticală din lemn — etaj adăugat pe o construcție existentă, cu structură ușoară și montaj rapid.",
    images: [
      "/images/projects/etaj-stoboru-sd-1.jpg",
      "/images/projects/etaj-stoboru-sd-2.jpg",
    ],
  },
  {
    slug: "galerie-cluj-pm",
    title: "Galerie Cluj — P.M.",
    category: "Structuri speciale",
    location: "Cluj-Napoca, CJ",
    spec: "Structură specială adaptată",
    description:
      "Structură specială adaptată proiectului, realizată din panouri de lemn masiv certificate (KLH original).",
    images: ["/images/projects/galerie-cluj-pm-1.jpg"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
