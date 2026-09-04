import type { NextConfig } from "next";

/**
 * Hosts allowed for next/image when a shop (or work) `image`/`src` is a remote URL.
 * Add a hostname here before pointing JSON at a new CDN, or next/image will fail at runtime.
 */
export const remoteImagePatterns: NonNullable<
  NextConfig["images"]
>["remotePatterns"] = [
  { protocol: "https", hostname: "i.etsystatic.com" },
  { protocol: "https", hostname: "*.etsystatic.com" },
  { protocol: "https", hostname: "www.etsy.com" },
  { protocol: "https", hostname: "etsy.com" },
  { protocol: "https", hostname: "app.manifold.xyz" },
  { protocol: "https", hostname: "manifold.xyz" },
  { protocol: "https", hostname: "*.manifold.xyz" },
  { protocol: "https", hostname: "res.cloudinary.com" },
  { protocol: "https", hostname: "cdn.shopify.com" },
  { protocol: "https", hostname: "*.myshopify.com" },
  { protocol: "https", hostname: "i.imgur.com" },
  { protocol: "https", hostname: "ipfs.io" },
  { protocol: "https", hostname: "*.ipfs.io" },
  { protocol: "https", hostname: "nftstorage.link" },
  { protocol: "https", hostname: "*.nftstorage.link" },
  { protocol: "https", hostname: "arweave.net" },
  { protocol: "https", hostname: "*.arweave.net" },
  { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
  { protocol: "https", hostname: "*.s3.amazonaws.com" },
  { protocol: "https", hostname: "*.cloudfront.net" },
  { protocol: "https", hostname: "images.ctfassets.net" },
  { protocol: "https", hostname: "www.datocms-assets.com" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: remoteImagePatterns,
  },
};

export default nextConfig;
