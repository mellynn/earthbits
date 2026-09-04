import type { Metadata } from "next";
import { ShopCatalog } from "@/components/ShopCatalog";
import { getShop } from "@/lib/content";

const shop = getShop();

export const metadata: Metadata = {
  title: "Shop",
  description: shop.lede,
};

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <header className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="font-display text-6xl font-light tracking-tight md:text-7xl">
          {shop.headline}
        </h1>
        <p className="mt-6 text-[15px] leading-8 text-muted">{shop.lede}</p>
      </header>
      <ShopCatalog />
    </main>
  );
}
