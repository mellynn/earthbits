export const shopItemTypes = ["physical", "nft", "other"] as const;
export type ShopItemType = (typeof shopItemTypes)[number];

export type PlaceholderMotif =
  | "wireframe-bloom"
  | "point-cloud"
  | "pixel-field"
  | "lidar-land"
  | "vase-study"
  | "scan-portrait"
  | "glass-bloom"
  | "photogrammetry"
  | "waveform"
  | "desk-study"
  | "studio-wall"
  | "glitch-portrait";

export type MediaAspect = "square" | "portrait" | "wide";

export type MediaSlot = {
  src?: string;
  /** Looping muted video. `src` or `poster` is used as the poster still. */
  video?: string;
  poster?: string;
  alt: string;
  caption?: string;
  /** True while `src` still points at a labeled placeholder, not original artwork. */
  placeholder?: boolean;
  motif?: PlaceholderMotif;
  seed?: number;
  aspect?: MediaAspect;
};

export const shopCategoryTypes = {
  physical: ["physical"],
  digital: ["nft", "other"],
} as const satisfies Record<string, readonly ShopItemType[]>;

export type ShopCategoryId = keyof typeof shopCategoryTypes;

export type ProcessStep = {
  title: string;
  body: string;
  layout: "thirds" | "pair" | "wide";
  media: MediaSlot[];
};

export type Work = {
  slug: string;
  title: string;
  order: number;
  client?: string;
  categories: string[];
  tools?: string[];
  cover: MediaSlot;
  hero?: MediaSlot[];
  about: string[];
  processIntro?: string;
  vimeoUrl?: string;
  vimeoUrls?: string[];
  process?: ProcessStep[];
  final?: {
    title: string;
    body?: string;
    media: MediaSlot[];
  };
};

export type ShopItem = {
  id: string;
  title: string;
  type: ShopItemType;
  description: string;
  image?: string;
  imageAlt?: string;
  externalUrl?: string;
  externalLabel?: string;
  price?: string;
};

export type ExternalShop = {
  label: string;
  url: string;
  note: string;
};

export type SiteSocial = {
  label: string;
  handle: string;
  url: string;
};

export type SiteContent = {
  name: string;
  brand: string;
  title: string;
  role: string;
  tagline: string;
  email: string;
  url: string;
  socials: {
    instagram: SiteSocial;
    twitter: SiteSocial;
  };
  about: string[];
  exhibits: string[];
};

export type ShopContent = {
  headline: string;
  lede: string;
  categories: { id: ShopCategoryId; title: string; empty: string }[];
  externalShops: ExternalShop[];
  items: ShopItem[];
};
