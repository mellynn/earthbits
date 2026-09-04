import { MediaFrame } from "@/components/MediaFrame";
import { PillLink } from "@/components/PillLink";
import { getShop, shopItemsForCategory } from "@/lib/content";
import { getSite } from "@/lib/site";
import type { ShopItem } from "@/lib/types";

function ItemCard({ item }: { item: ShopItem }) {
  const price = item.price?.trim();

  return (
    <article className="overflow-hidden border border-line bg-[#262323]">
      {item.image ? (
        <MediaFrame
          slot={{
            src: item.image,
            alt: item.imageAlt || item.title,
            aspect: "square",
          }}
        />
      ) : (
        <MediaFrame
          slot={{
            alt: `${item.title} placeholder`,
            motif: item.type === "physical" ? "vase-study" : "glass-bloom",
            aspect: "square",
            seed: item.id.length,
          }}
        />
      )}
      <div className="space-y-3 bg-paper px-5 py-6 text-ink">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
          {item.type === "nft" ? "NFT" : item.type}
        </p>
        <h3 className="font-display text-3xl font-light">{item.title}</h3>
        <p className="text-sm leading-6 text-ink/70">{item.description}</p>
        {price ? <p className="text-sm">{price}</p> : null}
        {item.externalUrl ? (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-ink underline-offset-4 hover:underline"
          >
            {item.externalLabel || "View listing"}
            <span className="ml-1" aria-hidden="true">
              →
            </span>
            <span className="sr-only"> (external)</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

function CategoryColumn({
  title,
  empty,
  items,
}: {
  title: string;
  empty: string;
  items: ShopItem[];
}) {
  return (
    <div>
      <h2 className="mb-6 font-display text-4xl font-light text-paper">{title}</h2>
      {items.length === 0 ? (
        <div className="border border-dashed border-line px-6 py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Coming soon</p>
          <p className="mt-4 text-sm leading-7 text-muted">{empty}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ShopCatalog() {
  const shop = getShop();
  const site = getSite();

  return (
    <div className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-2">
        {shop.categories.map((category) => (
          <CategoryColumn
            key={category.id}
            title={category.title}
            empty={category.empty}
            items={shopItemsForCategory(shop.items, category.id)}
          />
        ))}
      </div>

      <section className="border-t border-line pt-12">
        <h2 className="font-display text-3xl font-light text-paper">Elsewhere</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
          Soft links to existing storefronts. These are external — verify listings,
          availability, and prices there. They are not this site’s current inventory.
        </p>
        <ul className="mt-8 space-y-6">
          {shop.externalShops.map((shopLink) => (
            <li key={shopLink.url} className="max-w-xl">
              <a
                href={shopLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-paper underline-offset-4 hover:text-accent hover:underline"
              >
                {shopLink.label}
                <span className="ml-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                  External
                </span>
              </a>
              <p className="mt-2 text-sm leading-6 text-muted">{shopLink.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <PillLink href={`mailto:${site.email}`}>Inquire by email</PillLink>
        </div>
      </section>
    </div>
  );
}
