import React, { useState, useEffect, useRef } from "react";
import localforage from "localforage";
// @ts-ignore
import { QRCodeCanvas } from "qrcode.react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon as ArrowDownTrayOutlineIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import SeoHead from "../components/SeoHead";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
  FaqItem,
} from "../seo/seo";

const SHORTIFY_PREFIX = window.location.origin + "/s/";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function normalizeUrl(url: string) {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}

function generateShortId() {
  return Math.random().toString(36).slice(2, 8);
}

type ShortUrl = {
  id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
};

const Shortify: React.FC = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(80);
  const qrRefs = useRef<{ [id: string]: HTMLCanvasElement | null }>({});
  const { isDark } = useTheme();
  const location = useLocation();
  const isRedirectRoute = location.pathname.startsWith("/s/");

  const faqItems: FaqItem[] = [
    {
      question: "Is Shortify a free URL shortener?",
      answer:
        "Yes. Shortify is a free URL shortener that lets you create clean, shareable short links and QR codes without changing how the app works.",
    },
    {
      question: "Can I use Shortify as a Bitly alternative?",
      answer:
        "Yes. Shortify provides a simple Bitly alternative for custom short URLs, link sharing, and QR code generation.",
    },
    {
      question: "Does Shortify support QR code generation?",
      answer:
        "Yes. Every shortened link can be turned into a QR code so you can share the same destination across print, mobile, and web experiences.",
    },
    {
      question: "Are my links stored locally?",
      answer:
        "Yes. Your URLs and click counts are stored in your browser so the app stays fast, lightweight, and privacy-friendly.",
    },
  ];

  const pageTitle =
    "Free URL Shortener, Link Shortener, QR Code Generator, and Bitly Alternative | Shortify";
  const pageDescription =
    "Shortify is a free URL shortener, link shortener, QR code generator, and Bitly alternative for custom short URLs, fast sharing, and local link tracking.";
  const pageKeywords = [
    "Free URL Shortener",
    "Link Shortener",
    "QR Code Generator",
    "Bitly Alternative",
    "Custom Short URL",
    "URL shortener",
    "short links",
  ];

  const schemas = [
    createBreadcrumbSchema([{ name: "Home", path: "/" }]),
    createSoftwareApplicationSchema(pageDescription, "/"),
    createFaqSchema(faqItems),
  ];

  useEffect(() => {
    localforage.getItem("shortify-urls").then((stored: unknown) => {
      if (stored) setUrls(stored as ShortUrl[]);
    });
  }, []);

  useEffect(() => {
    const updateQrSize = () => {
      if (window.innerWidth < 640) {
        setQrSize(40); // Mobile
      } else if (window.innerWidth < 1024) {
        setQrSize(50); // Tablet
      } else {
        setQrSize(70); // Desktop
      }
    };

    updateQrSize();
    window.addEventListener("resize", updateQrSize);
    return () => window.removeEventListener("resize", updateQrSize);
  }, []);

  useEffect(() => {
    localforage.setItem("shortify-urls", urls);
  }, [urls]);

  // Handle redirect for shortened URLs
  useEffect(() => {
    const handleRedirect = async () => {
      // Check for path-based redirects (production domain)
      const path = window.location.pathname;
      if (path.startsWith("/s/")) {
        const shortId = path.substring(3); // Remove '/s/' prefix
        const stored = await localforage.getItem("shortify-urls");
        if (stored) {
          const storedUrls = stored as ShortUrl[];
          const url = storedUrls.find((u) => u.id === shortId);
          if (url) {
            // Update click count
            const updatedUrls = storedUrls.map((u) =>
              u.id === shortId ? { ...u, clicks: u.clicks + 1 } : u,
            );
            await localforage.setItem("shortify-urls", updatedUrls);
            // Redirect to original URL immediately
            window.location.replace(url.longUrl);
            return; // Exit early to prevent further processing
          }
        }
        // URL not found, redirect to home page
        window.location.replace("/");
        return;
      }

      // Check for hash-based redirects (local development)
      const hash = window.location.hash;
      if (hash.startsWith("#/s/")) {
        const shortId = hash.substring(4);
        const stored = await localforage.getItem("shortify-urls");
        if (stored) {
          const storedUrls = stored as ShortUrl[];
          const url = storedUrls.find((u) => u.id === shortId);
          if (url) {
            // Update click count
            const updatedUrls = storedUrls.map((u) =>
              u.id === shortId ? { ...u, clicks: u.clicks + 1 } : u,
            );
            await localforage.setItem("shortify-urls", updatedUrls);
            // Redirect to original URL immediately
            window.location.replace(url.longUrl);
            return; // Exit early to prevent further processing
          }
        }
        // URL not found, redirect to home page
        window.location.replace("/");
        return;
      }
    };

    handleRedirect();
  }, []);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let url = input.trim();
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    url = normalizeUrl(url);
    if (!isValidUrl(url)) {
      setError("Invalid URL. Please check and try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const id = generateShortId();
      // Create a shortened URL that works with the current domain
      const shortUrl = SHORTIFY_PREFIX + id;
      const newUrl: ShortUrl = {
        id,
        longUrl: url,
        shortUrl,
        clicks: 0,
        createdAt: new Date(),
      };
      setUrls((prev) => [newUrl, ...prev]);
      setInput("");
      setLoading(false);
    }, 700);
  };

  const handleCopy = (shortUrl: string, id: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  const handleVisit = (id: string, url: string) => {
    setUrls((prev) =>
      prev.map((u) => (u.id === id ? { ...u, clicks: u.clicks + 1 } : u)),
    );
    window.open(url, "_blank");
  };

  const handleShare = async (shortUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ url: shortUrl });
      } catch (e) {
        // user cancelled or error
      }
    } else {
      navigator.clipboard.writeText(shortUrl);
      alert("Link copied to clipboard!");
    }
  };

  // Download QR as PNG
  const handleDownloadQR = (id: string) => {
    const canvas = qrRefs.current[id];
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `shortify-qr-${id}.png`;
      a.click();
    }
  };

  if (isRedirectRoute) {
    return null;
  }

  return (
    <main id="main-content" className="min-h-screen w-full flex flex-col">
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        path="/"
        schema={schemas}
      />
      <section className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-6 sm:py-10">
        <div className="mx-auto mb-8 max-w-4xl rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mustard dark:text-vanilla">
            Free URL Shortener
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-darkslate dark:text-vanilla leading-tight">
            Free URL Shortener, Link Shortener, QR Code Generator, and Bitly
            Alternative
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-darkslate/80 dark:text-vanilla/80">
            Shortify helps you turn long links into clean, custom short URLs,
            generate QR codes for offline sharing, and keep everything stored
            locally in your browser for a fast, privacy-friendly workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/url-shortener"
              className="btn btn-primary rounded-full px-4 py-2"
            >
              URL Shortener
            </Link>
            <Link
              to="/free-url-shortener"
              className="btn btn-primary rounded-full px-4 py-2"
            >
              Free URL Shortener
            </Link>
            <Link
              to="/qr-code-generator"
              className="btn btn-primary rounded-full px-4 py-2"
            >
              QR Code Generator
            </Link>
            <Link
              to="/bitly-alternative"
              className="btn btn-primary rounded-full px-4 py-2"
            >
              Bitly Alternative
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6 sm:py-10">
          <form
            onSubmit={handleShorten}
            className="w-full max-w-xl card flex flex-col gap-4 shadow-xl mb-8 border border-darkslate/10 dark:border-vanilla/10 bg-white/90 dark:bg-darkslate/90 backdrop-blur-sm"
          >
            <label
              htmlFor="url"
              className="font-semibold text-darkslate dark:text-vanilla text-responsive-lg text-center mb-1 font-sans"
            >
              Paste your long URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="url"
                type="text"
                className="flex-1 rounded-full border-2 border-darkslate/20 dark:border-vanilla/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mustard dark:focus:ring-vanilla focus:border-mustard dark:focus:border-vanilla bg-vanilla dark:bg-darkslate text-darkslate dark:text-vanilla placeholder:text-darkslate/40 dark:placeholder:text-vanilla/40 shadow text-responsive-base font-mono transition-all min-w-0"
                placeholder="https://example.com/very/long/url"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn btn-primary min-w-[120px] flex items-center justify-center shadow hover:scale-105 text-responsive-base rounded-full font-bold transition-all"
                disabled={loading}
                title="Shorten URL"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-darkslate border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <SparklesIcon
                      className="w-5 h-5 mr-1 inline-block align-text-bottom"
                      aria-label="Shorten"
                    />{" "}
                    Shorten
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="text-redbrick dark:text-redbrick font-semibold text-responsive-sm mt-1 text-center">
                {error}
              </div>
            )}
          </form>
          <div className="w-full max-w-xl flex items-center gap-2 text-darkslate/70 dark:text-vanilla/70 text-responsive-base mb-4">
            <span className="font-bold">Total URLs shortened:</span>{" "}
            <span className="bg-mustard dark:bg-vanilla px-2 py-1 rounded text-darkslate dark:text-darkslate font-mono">
              {urls.length}
            </span>
          </div>
          <hr className="w-full max-w-xl border-t border-darkslate/10 dark:border-vanilla/10 mb-8" />
          <div className="w-full max-w-2xl space-y-6">
            {urls.length === 0 && (
              <div className="text-darkslate/60 dark:text-vanilla/60 italic text-center text-responsive-base">
                No URLs shortened yet. Try it out!
              </div>
            )}
            {urls.length > 0 && (
              <div
                key={urls[0].id}
                className="bg-white/90 dark:bg-darkslate/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-darkslate/10 dark:border-vanilla/10 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Main Content */}
                <div className="p-3 sm:p-6">
                  <div className="flex flex-row items-start gap-3 sm:gap-6">
                    {/* URL Content - 70% width */}
                    <div
                      className="flex-1 min-w-0 space-y-2 sm:space-y-3"
                      style={{ width: "70%" }}
                    >
                      {/* Original URL */}
                      <div>
                        <label className="text-xs font-semibold text-darkslate/60 dark:text-vanilla/60 uppercase tracking-wide mb-1 block">
                          Original URL
                        </label>
                        <div className="text-xs sm:text-sm lg:text-base text-darkslate dark:text-vanilla font-medium break-all bg-darkslate/5 dark:bg-vanilla/5 rounded-lg p-2 sm:p-3">
                          {urls[0].longUrl}
                        </div>
                      </div>

                      {/* Shortened URL */}
                      <div>
                        <label className="text-xs font-semibold text-darkslate/60 dark:text-vanilla/60 uppercase tracking-wide mb-1 block">
                          Shortened URL
                        </label>
                        <div className="flex items-center gap-1 bg-mustard/10 dark:bg-vanilla/10 rounded-lg p-2 sm:p-2">
                          <a
                            href={urls[0].shortUrl}
                            className="text-mustard dark:text-vanilla font-mono text-xs sm:text-sm lg:text-base break-all hover:text-redbrick dark:hover:text-mustard transition-colors flex-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleVisit(urls[0].id, urls[0].longUrl);
                            }}
                            title="Click to visit the original URL"
                          >
                            {urls[0].shortUrl}
                          </a>
                          <div className="flex gap-1 sm:gap-1">
                            <button
                              className="btn btn-secondary px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-mustard hover:text-darkslate transition-all duration-200 flex items-center gap-1 sm:gap-2"
                              onClick={() =>
                                handleCopy(urls[0].shortUrl, urls[0].id)
                              }
                              title="Copy short URL"
                            >
                              {copiedId === urls[0].id ? (
                                <>
                                  <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="sm:inline">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">Copy</span>
                                </>
                              )}
                            </button>
                            <button
                              className="btn btn-primary px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
                              onClick={() =>
                                handleVisit(urls[0].id, urls[0].longUrl)
                              }
                              title="Visit original URL"
                            >
                              <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Visit</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* QR Code and Actions - 30% width */}
                    <div
                      className="flex flex-col mt-2 items-center gap-3 sm:gap-4"
                      style={{ width: "30%" }}
                    >
                      {/* QR Code */}
                      <div className="bg-white dark:bg-darkslate rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-md border border-darkslate/10 dark:border-vanilla/10">
                        <QRCodeCanvas
                          value={urls[0].shortUrl}
                          size={qrSize}
                          bgColor={isDark ? "#335C67" : "#FFF3B0"}
                          fgColor={isDark ? "#FFF3B0" : "#335C67"}
                          level="H"
                          includeMargin={true}
                          ref={(el: HTMLCanvasElement | null) =>
                            (qrRefs.current[urls[0].id] = el)
                          }
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1.5 sm:gap-2">
                        <button
                          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-darkslate/10 dark:bg-vanilla/10 hover:bg-darkslate/20 dark:hover:bg-vanilla/20 text-darkslate dark:text-vanilla rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
                          onClick={() => handleDownloadQR(urls[0].id)}
                          title="Download QR code"
                        >
                          <ArrowDownTrayOutlineIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-mustard/20 dark:bg-vanilla/20 hover:bg-mustard/30 dark:hover:bg-vanilla/30 text-darkslate dark:text-vanilla rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
                          onClick={() => handleShare(urls[0].shortUrl)}
                          title="Share link"
                        >
                          <ShareIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="mx-auto mt-12 w-full max-w-5xl rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-6 sm:p-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-darkslate dark:text-vanilla">
            Why people use Shortify
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Custom short URLs",
                text: "Turn long links into neat, memorable URLs that are easier to share and track.",
              },
              {
                title: "QR code generator",
                text: "Create QR codes for each link so your audience can scan from print, packaging, and presentations.",
              },
              {
                title: "Bitly alternative",
                text: "Use a simple Bitly alternative with local storage, link history, and no complicated setup.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl bg-vanilla/30 dark:bg-vanilla/10 p-5 border border-darkslate/10 dark:border-vanilla/10"
              >
                <h3 className="text-lg font-bold text-darkslate dark:text-vanilla">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-darkslate/75 dark:text-vanilla/75">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 w-full max-w-5xl rounded-3xl border border-darkslate/10 dark:border-vanilla/10 bg-white/80 dark:bg-darkslate/80 p-6 sm:p-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-darkslate dark:text-vanilla">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((faq) => (
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
      </section>
    </main>
  );
};

export default Shortify;
