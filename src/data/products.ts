export type ProductVariant = {
  color: string;
  images: string[];
  price?: number;
};

export type Product = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  collection: string;
  variants: ProductVariant[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
    capacity: string;
  };
};

export const products: Product[] = [
  {
    id: "ember",
    name: "NOVE Ember",
    basePrice: 5999,
    collection: "Ember Series",
    description: "Inspired by the element of fire, the Ember represents pure strength and timeless ambition. Its fluid silhouette catches light with liquid-glass precision.",
    dimensions: {
      height: "18 cm",
      width: "24 cm",
      depth: "8 cm",
      capacity: "Daily essentials + 8\" tablet"
    },
    variants: [
      {
        color: "Black",
        images: [
          "/products/Updates/black1.jpeg",
          "/products/Updates/black2.jpeg",
          "/products/Updates/black3.jpeg",
          "/products/Updates/black4.jpeg",
          "/products/Updates/black5.jpeg"
        ],
        price: 5999
      },
      {
        color: "Olive Green",
        images: [
          "/products/Updates/green1.jpeg",
          "/products/Updates/green2.jpeg",
          "/products/Updates/green3.jpeg",
          "/products/Updates/green4.jpeg",
          "/products/Updates/green5.jpeg"
        ],
        price: 5999
      }
    ]
  },
  {
    id: "aqua",
    name: "NOVE Aqua",
    basePrice: 5999,
    collection: "Aqua Series",
    description: "Inspired by the flow of water, the Aqua series represents pristine aesthetic and vibrant expression. A masterpiece of organic minimalism.",
    dimensions: {
      height: "20 cm",
      width: "26 cm",
      depth: "9 cm",
      capacity: "Daily carry + Small notebook"
    },
    variants: [
      {
        color: "White",
        images: [
          "/products/Aqua/CherryWhite/aq_main.png",
          "/products/Aqua/CherryWhite/img2.jpeg",
          "/products/Aqua/CherryWhite/img3.jpeg",
          "/products/Aqua/CherryWhite/img6.jpeg"
        ],
        price: 5999
      },
      {
        color: "Cherry Red",
        images: ["/products/Aqua/aqr_v1.png", "/products/Aqua/aqua_1.jpeg", "/products/Aqua/aqua_2.jpeg", "/products/Aqua/aqua_5.jpeg"],
        price: 5999
      }
    ]
  },
  {
    id: "aero",
    name: "NOVE Aero",
    basePrice: 5999,
    collection: "Aero Series",
    description: "Inspired by the clarity of air, the Aero series represents effortless ease and modern minimalism. Deeply confident, quietly elegant.",
    dimensions: {
      height: "16 cm",
      width: "22 cm",
      depth: "7 cm",
      capacity: "Evening essentials + Phone"
    },
    variants: [
      {
        color: "Black",
        images: [
          "/products/Aero/Black/ae_main.png",
          "/products/Aero/Black/img3.jpeg",
          "/products/Aero/Black/img4.jpeg",
          "/products/Aero/Black/img5.jpeg"
        ],
        price: 5999
      },
      {
        color: "Dusty Pink",
        images: [
          "/products/Aero/aero_3.jpeg",
          "/products/product_21.png"
        ],
        price: 5999
      }
    ]
  },
  {
    id: "terra",
    name: "NOVE Terra",
    basePrice: 5999,
    collection: "Terra Series",
    description: "Inspired by the grounding textures of earth, the Terra series represents clean lines and organic resilience. Crafted for the modern minimalist.",
    dimensions: {
      height: "28 cm",
      width: "36 cm",
      depth: "12 cm",
      capacity: "Fits 13\" MacBook + Documents"
    },
    variants: [
      {
        color: "White",
        images: [
          "/products/Terra/White/img3.jpeg",
          "/products/Terra/White/img2.jpeg",
          "/products/Terra/White/img4.jpeg"
        ],
        price: 5999
      },
      {
        color: "Heather Brown",
        images: [
          "/products/Terra/HeatherBrown/f9951844-c074-4e39-8e0b-b2ab33c08f18.png",
          "/products/Terra/HeatherBrown/IMG_3161.png",
          "/products/Terra/HeatherBrown/IMG_3162.png"
        ],
        price: 5999
      }
    ]
  }
];
