import React from "react";
import { Helmet } from "react-helmet-async";
import {
  createOrganizationSchema,
  createWebsiteSchema,
  getAbsoluteAssetUrl,
  getCanonicalUrl,
  getKeywords,
  SITE_NAME,
} from "../seo/seo";

type SeoHeadProps = {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  schema?: Array<Record<string, unknown>>;
  image?: string;
  noindex?: boolean;
};

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords,
  path,
  schema = [],
  image = "/shortify.png",
  noindex = false,
}) => {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = getAbsoluteAssetUrl(image);
  const scripts = [
    createOrganizationSchema(),
    createWebsiteSchema(),
    ...schema,
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={getKeywords(keywords)} />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {process.env.REACT_APP_GOOGLE_SITE_VERIFICATION ? (
        <meta
          name="google-site-verification"
          content={process.env.REACT_APP_GOOGLE_SITE_VERIFICATION}
        />
      ) : null}
      {process.env.REACT_APP_BING_SITE_VERIFICATION ? (
        <meta
          name="msvalidate.01"
          content={process.env.REACT_APP_BING_SITE_VERIFICATION}
        />
      ) : null}

      {scripts.map((item, index) => (
        <script key={`ld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
