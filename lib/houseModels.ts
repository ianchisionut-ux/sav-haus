export type HouseModel = {
  id: string;
  area: number;
  built: number;
  floors: string;
  bedrooms: number;
  title: string;
  description: string;
  image: string;
  plans: { name: string; image: string }[];
  areaNote?: string;
};

export const catalogPdf = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/f9f81c48-c1eb-411d-be3d-0946c90ebf11.pdf";
export const houseModels: HouseModel[] = [
  {
    "id": "01",
    "area": 61,
    "built": 75,
    "floors": "P",
    "bedrooms": 1,
    "title": "Compactă. Clară. Primitoare.",
    "description": "Un model pe un singur nivel, cu dormitor separat și living cu bucătărie.",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/abfc2c7c-c0ef-4f27-b70d-61eb8de47a35.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/56a638fa-3ce8-44eb-991c-a63a36578db5.jpg"
      }
    ]
  },
  {
    "id": "02",
    "area": 88.62,
    "built": 115,
    "floors": "P",
    "bedrooms": 2,
    "title": "Două dormitoare. Un singur nivel.",
    "description": "Bucătărie delimitată, cămară, living și două grupuri sanitare.",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/e88cc55c-83be-422c-8df4-3fc4f75a5ea4.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/9fc13c89-3078-417d-bc3d-abd9aa2c90d1.jpg"
      }
    ]
  },
  {
    "id": "03",
    "area": 100.23,
    "built": 130,
    "floors": "P",
    "bedrooms": 2,
    "title": "Zona de zi, în prim-plan.",
    "description": "Livingul și bucătăria formează un spațiu comun de 41,38 m².",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/a8b1f01d-bfa5-467b-9368-b129f1974cd3.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/c2bf831e-dc47-4583-b5ab-b81676b84e56.jpg"
      }
    ]
  },
  {
    "id": "04",
    "area": 121.32,
    "built": 157.95,
    "floors": "P",
    "bedrooms": 3,
    "title": "Spațiu pentru întreaga familie.",
    "description": "Trei dormitoare și un living generos, fără scări.",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/e8a0c26a-603a-4903-9c3e-30e15352c7b8.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/40b3293c-c8ef-4714-89b7-3bba143436d8.jpg"
      }
    ]
  },
  {
    "id": "05",
    "area": 150.99,
    "built": 178.75,
    "floors": "P",
    "bedrooms": 3,
    "title": "Mai mult loc pentru fiecare.",
    "description": "Un parter generos, cu trei dormitoare și spații de depozitare.",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/e1a6830a-c51f-4ecf-94b5-9556419c04b6.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/edc9e9dd-08d3-44f2-bab4-14ee4ec2a7e9.jpg"
      }
    ]
  },
  {
    "id": "06",
    "area": 105,
    "built": 144,
    "floors": "P+M",
    "bedrooms": 3,
    "title": "Familie pe două niveluri.",
    "description": "Zona de zi la parter, trei dormitoare și baie la mansardă.",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/4d673112-25f6-4395-9921-b42276926b90.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/11eefba5-14ee-45fe-8bd1-577d39ba2bec.jpg"
      },
      {
        "name": "Mansardă",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/f0ce52ea-a423-4b0c-a3c6-f53aca7938bd.jpg"
      }
    ]
  },
  {
    "id": "07",
    "area": 134.14,
    "built": 178.5,
    "floors": "P+M",
    "bedrooms": 3,
    "title": "Loc pentru familie și lucru.",
    "description": "Trei dormitoare și birou separat; suprafața necesită confirmare.",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/3884d2f5-2797-4b1b-be3e-17e5caf1723b.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/410053f8-9913-45f6-945d-7746ce383ea4.jpg"
      },
      {
        "name": "Mansardă",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/4fa62d6f-737b-42ee-88cf-922e8d39a83c.jpg"
      }
    ],
    "areaNote": "Pentru Casa 07, centralizatorul indică 134,14 m², însă antetele planurilor însumează 132,14 m². Valoarea necesită confirmarea proiectantului."
  },
  {
    "id": "08",
    "area": 165.11,
    "built": 222,
    "floors": "P+E",
    "bedrooms": 3,
    "title": "Generozitate pe două niveluri.",
    "description": "Living, birou, trei dormitoare și balcon separat de 9 m².",
    "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/68c7bf8f-2ddd-4b6e-9030-ff02065c8183.jpg",
    "plans": [
      {
        "name": "Parter",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/3c80ef94-5ac1-4abd-b3a5-1a34497c63e8.jpg"
      },
      {
        "name": "Etaj",
        "image": "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/e5280ffd-b111-4ea1-a8b7-5d32816e9012.jpg"
      }
    ]
  }
];
