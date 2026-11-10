/**
 * Suprafete reproduse din Catalogul SAV HAUS 2026, paginile de
 * compartimentare ale modelelor 01-08. Scara si balconul, unde sunt
 * listate separat, nu sunt incluse in suprafata utila a nivelului.
 */
export type RoomArea = readonly [label: string, squareMeters: number];

export type LevelDetails = {
  usefulArea: number;
  developedArea: number;
  exteriorDimensions: string;
  sourcePage: number;
  rooms: readonly RoomArea[];
  separate?: readonly RoomArea[];
  note?: string;
  discrepancy?: boolean;
};

export const levelDetails: Record<string, Record<string, LevelDetails>> = {
  "01": {
    Parter: {
      usefulArea: 61, developedArea: 75, exteriorDimensions: "10,00 × 7,50 m", sourcePage: 5,
      rooms: [
        ["Living + bucătărie", 25.9], ["Dormitor", 14.08],
        ["Baie", 7.36], ["Cameră tehnică", 7.36], ["Hol", 6.3]
      ]
    }
  },
  "02": {
    Parter: {
      usefulArea: 88.62, developedArea: 115, exteriorDimensions: "11,50 × 10,00 m", sourcePage: 8,
      rooms: [
        ["Living", 26.9], ["Bucătărie", 7.59], ["Dormitor 1", 11.1],
        ["Dormitor 2", 12.58], ["Baie", 5.98], ["Baie", 2.7],
        ["Cămară", 3.6], ["Cameră tehnică", 4.8], ["Hol", 13.37]
      ]
    }
  },
  "03": {
    Parter: {
      usefulArea: 100.23, developedArea: 130, exteriorDimensions: "13,00 × 10,00 m", sourcePage: 12,
      rooms: [
        ["Living + bucătărie", 41.38], ["Dormitor 1", 16.65],
        ["Dormitor 2", 13.2], ["Baie", 11.8], ["WC", 4.2],
        ["Cameră tehnică", 5.6], ["Hol", 7.4]
      ]
    }
  },
  "04": {
    Parter: {
      usefulArea: 121.32, developedArea: 157.95, exteriorDimensions: "13,50 × 10,70 m", sourcePage: 15,
      rooms: [
        ["Living", 38.2], ["Bucătărie", 9],
        ["Dormitor 1", 15.12], ["Dormitor 2", 11.85],
        ["Dormitor 3", 15.8], ["Baie", 7.5],
        ["WC", 2.25], ["Cameră tehnică", 6.9], ["Hol", 14.7]
      ]
    }
  },
  "05": {
    Parter: {
      usefulArea: 150.99, developedArea: 178.75, exteriorDimensions: "16,50 × 12,50 m", sourcePage: 18,
      rooms: [
        ["Living + bucătărie", 47.8],
        ["Dormitor 1", 16.2], ["Dormitor 2", 16.2],
        ["Dormitor 3", 14.8], ["Baie", 8.4],
        ["WC", 4.2], ["Cameră tehnică", 7.8], ["Depozit", 5.29],
        ["Hol intrare", 16.65], ["Hol", 13.65]
      ]
    }
  },
  "06": {
    Parter: {
      usefulArea: 52.76, developedArea: 72, exteriorDimensions: "8,00 × 9,00 m", sourcePage: 21,
      rooms: [
        ["Living", 28.12], ["Bucătărie", 6.48], ["Cămară", 3],
        ["Baie", 3.1], ["Cameră tehnică", 4.8], ["Hol", 7.26]
      ],
      separate: [["Scară", 5.72]],
      note: "Scara de 5,72 m² este notată separat și nu intră în suprafața utilă de 52,76 m²."
    },
    "Mansardă": {
      usefulArea: 52.24, developedArea: 72, exteriorDimensions: "8,00 × 9,00 m", sourcePage: 22,
      rooms: [
        ["Dormitor A", 14.08], ["Dormitor B", 12.16],
        ["Dormitor C", 12.96], ["Baie", 8], ["Hol", 5.04]
      ],
      separate: [["Scară", 5.72]],
      note: "Dormitoarele A/B/C sunt diferențiate editorial; în planul original sunt numite toate „Dormitor 1”. Scara este separată de suprafața utilă."
    }
  },
  "07": {
    Parter: {
      usefulArea: 67.7, developedArea: 89.25, exteriorDimensions: "10,50 × 8,50 m", sourcePage: 28,
      rooms: [
        ["Living + bucătărie", 33.11], ["Birou", 12.92],
        ["Cameră tehnică", 5.8], ["WC", 3.15], ["Hol", 12.72]
      ]
    },
    "Mansardă": {
      usefulArea: 64.44, developedArea: 89.25, exteriorDimensions: "10,50 × 8,50 m", sourcePage: 29,
      rooms: [
        ["Dormitor 1", 12.47], ["Dormitor 2", 15.3], ["Dormitor 3", 12.92],
        ["Dressing", 4.25], ["Baie", 11.11], ["WC", 3.64], ["Hol", 6.75]
      ],
      discrepancy: true,
      note: "De verificat cu proiectantul: antetul acestui plan indică 64,44 m², dar suma încăperilor este 66,44 m². Centralizatorul casei indică 134,14 m², iar antetele nivelurilor însumează 132,14 m²."
    }
  },
  "08": {
    Parter: {
      usefulArea: 87.06, developedArea: 111, exteriorDimensions: "12,00 × 10,00 m", sourcePage: 32,
      rooms: [
        ["Living + bucătărie", 45.38], ["Birou", 17.6],
        ["Cameră tehnică", 6.5], ["WC", 4.75], ["Hol", 12.83]
      ]
    },
    Etaj: {
      usefulArea: 78.05, developedArea: 111, exteriorDimensions: "12,00 × 10,00 m", sourcePage: 33,
      rooms: [
        ["Dormitor 1", 17.6], ["Dormitor 2", 16.28], ["Dormitor 3", 13.5],
        ["Dressing", 6.45], ["Baie", 11.75], ["WC", 4.68], ["Hol", 7.79]
      ],
      separate: [["Balcon", 9]],
      note: "Balconul de 9,00 m² este prezentat separat și nu intră în suprafața utilă de 78,05 m²."
    }
  }
};

export function formatSquareMeters(value: number): string {
  return value.toLocaleString("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + " m²";
}
