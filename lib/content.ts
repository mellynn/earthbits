import shopJson from "@/content/shop.json";
import flora from "@/content/works/flora-in-frequency.json";
import sidewalks from "@/content/works/sidewalks.json";
import transience from "@/content/works/transience.json";
import gardenscapes from "@/content/works/gardenscapes.json";
import {
  shopCategoryTypes,
  shopItemTypes,
  type ShopCategoryId,
  type ShopContent,
  type ShopItem,
  type Work,
} from "@/lib/types";

const works: Work[] = [
  flora as Work,
  sidewalks as Work,
  transience as Work,
  gardenscapes as Work,
].sort((a, b) => a.order - b.order);

export function getWorks(): Work[] {
  return works;
}

export function getWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

function sharedCategoryCount(a: Work, b: Work) {
  const set = new Set(a.categories);
  return b.categories.filter((category) => set.has(category)).length;
}

export function getRelatedWorks(slug: string): Work[] {
  const current = getWork(slug);
  const others = works.filter((work) => work.slug !== slug);
  if (!current) return others;
  return [...others].sort(
    (a, b) => sharedCategoryCount(current, b) - sharedCategoryCount(current, a),
  );
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

export function shopItemsForCategory(
  items: ShopItem[],
  categoryId: string,
): ShopItem[] {
  const types = shopCategoryTypes[categoryId as ShopCategoryId];
  if (!types) return [];
  return items.filter((item) =>
    (types as readonly string[]).includes(item.type),
  );
}
