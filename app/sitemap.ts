import type { MetadataRoute } from "next";
import { BRANDS } from "./data/products";
import {
  getAllInstallationPaths,
} from "./data/installation-regions";

import { CONTENT_UPDATED, SITE_URL } from "./data/site";

const lastModified = new Date(CONTENT_UPDATED);

export default function sitemap(): MetadataRoute.Sitemap {
  const brandPages: MetadataRoute.Sitemap =
    Object.keys(BRANDS).map((brand) => ({
      url: `${SITE_URL}/products/${brand}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const installationPages: MetadataRoute.Sitemap =
    getAllInstallationPaths().map(
      ({ region, district }) => ({
        url: `${SITE_URL}/installation/${region}/${district}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/order`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    ...brandPages,
    ...installationPages,
  ];
}
