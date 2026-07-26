export const SITE_NAME = "Shortify";
export const SITE_TAGLINE =
  "Free URL shortener, QR code generator, and Bitly alternative";
export const DEFAULT_SITE_URL = "https://shortifyy.vercel.app";
export const DEFAULT_OG_IMAGE = "/shortify.png";

export type FaqItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const getSiteUrl = () => {
  const configuredUrl = process.env.REACT_APP_SITE_URL;
  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return trimTrailingSlash(window.location.origin);
  }

  return DEFAULT_SITE_URL;
};

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};

export const getAbsoluteAssetUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};

export const getKeywords = (keywords: string[]) =>
  keywords.filter(Boolean).join(", ");

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: getSiteUrl(),
  logo: getAbsoluteAssetUrl(DEFAULT_OG_IMAGE),
});

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: getSiteUrl(),
  description: SITE_TAGLINE,
  potentialAction: {
    "@type": "SearchAction",
    target: `${getSiteUrl()}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const createSoftwareApplicationSchema = (
  description: string,
  path: string,
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: getCanonicalUrl(path),
  description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
});

export const createFaqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.path),
  })),
});

export const createKeywords = (...keywords: string[]) => getKeywords(keywords);
