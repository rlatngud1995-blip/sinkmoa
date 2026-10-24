import type { MetadataRoute } from "next";
import { BRANDS } from "./data/products";
import {
  getAllInstallationPaths,
} from "./data/installation-regions";

const SITE_URL = "https://www.sinkmoa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const brandPages: MetadataRoute.Sitemap =
    Object.keys(BRANDS).map((brand) => ({
      url: `${SITE_URL}/products/${brand}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const installationPages: MetadataRoute.Sitemap =
    getAllInstallationPaths().map(
      ({ region, district }) => ({
        url: `${SITE_URL}/installation/${region}/${district}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/order`,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    ...brandPages,
    ...installationPages,
  ];
}
