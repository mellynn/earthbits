import siteJson from "@/content/site.json";
import shopJson from "@/content/shop.json";
import flora from "@/content/works/flora-in-frequency.json";
import sidewalks from "@/content/works/sidewalks.json";
import transience from "@/content/works/transience.json";
import gardenscapes from "@/content/works/gardenscapes.json";
import {
  shopItemTypes,
  type ShopContent,
  type ShopItem,
  type SiteContent,
  type Work,
} from "@/lib/types";

const works: Work[] = [
  flora as Work,
  sidewalks as Work,
  transience as Work,
  gardenscapes as Work,
].sort((a, b) => a.order - b.order);

export function getSite(): SiteContent {
  return siteJson as SiteContent;
}

export function getWorks(): Work[] {
  return works;
}

export function getWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export function getRelatedWorks(slug: string): Work[] {
  return works.filter((work) => work.slug !== slug);
}

function isShopItem(value: unknown): value is ShopItem {
  if (!value || typeof value !== "object") return false;
  const item = value as ShopItem;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    shopItemTypes.includes(item.type) &&
    typeof item.description === "string"
  );
}

export function getShop(): ShopContent {
  const shop = shopJson as ShopContent;
  return {
    ...shop,
    items: (shop.items ?? []).filter(isShopItem),
  };
}

export function shopItemsByGroup(items: ShopItem[]) {
  return {
    physical: items.filter((item) => item.type === "physical"),
    digital: items.filter((item) => item.type === "nft" || item.type === "other"),
  };
}
