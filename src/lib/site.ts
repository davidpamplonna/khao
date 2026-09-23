const productionSiteUrl = `https://${
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "khao-six.vercel.app"
}`;

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : productionSiteUrl);

export const siteUrl = configuredSiteUrl.replace(/\/$/, "");
