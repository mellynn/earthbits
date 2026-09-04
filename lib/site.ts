import siteJson from "@/content/site.json";
import type { SiteContent } from "@/lib/types";

export function getSite(): SiteContent {
  return siteJson as SiteContent;
}
