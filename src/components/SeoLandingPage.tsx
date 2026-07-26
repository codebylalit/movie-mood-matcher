import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "./SeoHead";
import {
  BreadcrumbItem,
  FaqItem,
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
} from "../seo/seo";

type SeoLandingPageProps = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  heading: string;
  intro: string[];
  highlights: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  faqs: FaqItem[];
  relatedLinks: Array<{ label: string; to: string; description: string }>;
  breadcrumbItems: BreadcrumbItem[];
};

const SeoLandingPage: React.FC<SeoLandingPageProps> = ({
  path,
  title,
  description,
  keywords,
  heading,
  intro,
  highlights,
  steps,
  faqs,
  relatedLinks,
  breadcrumbItems,
}) => {
  const schemas = [
    createBreadcrumbSchema(breadcrumbItems),
    createSoftwareApplicationSchema(description, path),
    createFaqSchema(faqs),
  ];

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-darkslate dark:text-vanilla"
    >
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        schema={schemas}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-darkslate/70 dark:text-vanilla/70"
      >
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              <Link
                className="hover:text-mustard dark:hover:text-vanilla transition-colors"
                to={item.path}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className="rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/85 dark:bg-darkslate/85 shadow-xl backdrop-blur-sm p-6 sm:p-10 lg:p-12">
        <p className="inline-flex rounded-full border border-mustard/40 dark:border-vanilla/40 bg-mustard/10 dark:bg-vanilla/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-darkslate dark:text-vanilla">
          Free URL Shortener
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-darkslate dark:text-vanilla">
          {heading}
        </h1>
        <div className="mt-5 space-y-3 text-base sm:text-lg text-darkslate/80 dark:text-vanilla/80 max-w-3xl">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {relatedLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="btn btn-primary rounded-full px-4 py-2 text-sm sm:text-base"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-5 shadow-md"
          >
            <h2 className="text-xl font-bold text-darkslate dark:text-vanilla">
              {item.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-darkslate/75 dark:text-vanilla/75">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-darkslate dark:text-vanilla">
          How it works
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl bg-vanilla/40 dark:bg-vanilla/10 border border-darkslate/10 dark:border-vanilla/10 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mustard dark:text-vanilla">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-bold text-darkslate dark:text-vanilla">
                {step.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-darkslate/75 dark:text-vanilla/75">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-darkslate dark:text-vanilla">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-darkslate/10 dark:border-vanilla/10 bg-vanilla/30 dark:bg-vanilla/10 px-5 py-4"
            >
              <summary className="cursor-pointer text-lg font-semibold text-darkslate dark:text-vanilla">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm sm:text-base text-darkslate/75 dark:text-vanilla/75">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-darkslate dark:text-vanilla">
          Related Pages
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl border border-darkslate/10 dark:border-vanilla/10 bg-vanilla/25 dark:bg-vanilla/10 p-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-darkslate dark:text-vanilla">
                {link.label}
              </h3>
              <p className="mt-2 text-sm text-darkslate/70 dark:text-vanilla/70">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SeoLandingPage;
