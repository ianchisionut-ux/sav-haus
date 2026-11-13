export const wallMaterials = [
  {
    id: 'osb-exterior', number: '01', name: 'OSB · fața opusă', shortName: 'OSB exterior',
    category: 'Placare', color: '#bd9556', confirmation: 'Material vizibil în machetă',
    description: 'Placa din așchii de lemn care închide cealaltă față a cadrului. În model, o separăm pentru a putea vedea structura din spatele ei.',
    facts: ['Se observă textura caracteristică de așchii orientate.', 'Finisajele exterioare suplimentare nu sunt prezentate în filmare.'],
    note: 'Grosimea și clasa plăcii nu pot fi stabilite din video.',
  },
  {
    id: 'timber', number: '02', name: 'Structura de lemn', shortName: 'Cadru de lemn',
    category: 'Structură', color: '#d2ac73', confirmation: 'Material vizibil în machetă',
    description: 'Montanții verticali și traversele orizontale formează cadrul peretelui. Golurile dintre elementele de lemn primesc materialul izolator.',
    facts: ['Montanți, talpă și traversă superioară.', 'În filmare se văd secțiunile și fibra lemnului masiv.'],
    note: 'Esența, clasa de rezistență, tratarea și dimensiunile se confirmă în documentația proiectului.',
  },
  {
    id: 'insulation', number: '03', name: 'Vată minerală', shortName: 'Vată minerală',
    category: 'Izolație', color: '#b8bd6e', confirmation: 'Material fibros vizibil',
    description: 'Umplutura fibroasă dintre montanți. Este reprezentată în fiecare gol al cadrului și poate fi desprinsă separat pentru a vedea cum se așază în structură.',
    facts: ['Contribuie la izolarea termică și acustică a ansamblului.', 'În peretele asamblat, vata și montanții ocupă același plan.'],
    note: 'Pare vată bazaltică, dar tipul, densitatea și performanțele nu sunt confirmate din filmare.',
  },
  {
    id: 'osb-interior', number: '04', name: 'OSB · spre interior', shortName: 'OSB interior',
    category: 'Placare', color: '#b28a4c', confirmation: 'Material vizibil în machetă',
    description: 'A doua placă OSB se află pe fața cadrului orientată către membrană și placarea albă. Secțiunea decupată lasă vizibilă ordinea straturilor.',
    facts: ['Acoperă cadrul și materialul izolator.', 'Se vede în spatele membranei din macheta filmată.'],
    note: 'Clasa, grosimea și detaliile de fixare nu sunt specificate de această vizualizare.',
  },
  {
    id: 'membrane', number: '05', name: 'Membrană aluminizată', shortName: 'Membrană',
    category: 'Etanșare', color: '#adb9b4', confirmation: 'Rol exact de confirmat',
    description: 'Folia cu aspect metalizat, cu îmbinări lipite cu bandă. Este probabil un strat pentru etanșare și controlul vaporilor; produsul exact nu este identificat.',
    facts: ['Aspect argintiu și caroiaj observabile în filmare.', 'Banda de etanșare este reprezentată peste îmbinare.'],
    note: 'Poziționarea și proprietățile membranei se verifică în alcătuirea proiectată a peretelui.',
  },
  {
    id: 'lining', number: '06', name: 'Placarea interioară', shortName: 'Placare albă',
    category: 'Închidere', color: '#e6e6d9', confirmation: 'Tip de placă neconfirmat',
    description: 'Plăcile albe de la fața interioară a machetei. Aspectul sugerează gips-carton sau gips-fibră, fără a putea identifica sigur produsul din imagini.',
    facts: ['Închide fața interioară a secțiunii.', 'Sunt vizibile rosturi și puncte de fixare.'],
    note: 'Tipul plăcii, numărul de straturi și finisajul final necesită confirmare.',
  },
  {
    id: 'accessories', number: '+', name: 'Prinderi și instalații', shortName: 'Prinderi & copex',
    category: 'Accesorii', color: '#7e9393', confirmation: 'Elemente vizibile în machetă',
    description: 'Tubul copex negru pentru cabluri și colțarele metalice de prindere sunt prezentate separat ca detalii ale machetei, nu ca un strat continuu.',
    facts: ['Tub flexibil pentru traseul instalației electrice.', 'Colțare și elemente metalice la baza structurii.'],
    note: 'Traseele, fixările și îmbinările din model sunt ilustrative.',
  },
] as const;

export type WallMaterialId = typeof wallMaterials[number]['id'];
export const wallIllustrationNote = 'Secțiune ilustrativă reconstruită după macheta filmată. Grosimile, decupajele și distanțele dintre straturi sunt pentru prezentare; nu constituie detaliu de execuție.';
