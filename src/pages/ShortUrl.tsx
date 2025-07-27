import React, { useState, useEffect, useRef } from "react";
import localforage from "localforage";
// @ts-ignore
import { QRCodeCanvas } from "qrcode.react";
import {
  LinkIcon,
  HeartIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon as ArrowDownTrayOutlineIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

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
  const [dark, setDark] = useState(false);
  const [qrSize, setQrSize] = useState(80);
  const qrRefs = useRef<{ [id: string]: HTMLCanvasElement | null }>({});

  useEffect(() => {
    localforage.getItem("shortify-urls").then((stored: unknown) => {
      if (stored) setUrls(stored as ShortUrl[]);
    });
    localforage.getItem("shortify-dark").then((val: unknown) => {
      setDark(val === true);
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localforage.setItem("shortify-dark", dark);
  }, [dark]);

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
              u.id === shortId ? { ...u, clicks: u.clicks + 1 } : u
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
              u.id === shortId ? { ...u, clicks: u.clicks + 1 } : u
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
      prev.map((u) => (u.id === id ? { ...u, clicks: u.clicks + 1 } : u))
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

  return (
    <div className="min-h-screen w-full flex flex-col ">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6 sm:py-10">
        <form
          onSubmit={handleShorten}
          className="w-full max-w-xl card flex flex-col gap-4 shadow-xl mb-8 border border-darkslate/10"
        >
          <label
            htmlFor="url"
            className="font-semibold text-darkslate text-responsive-lg text-center mb-1 font-sans"
          >
            Paste your long URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="url"
              type="text"
              className="flex-1 rounded-full border-2 border-darkslate/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mustard focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow text-responsive-base font-mono transition-all min-w-0"
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
            <div className="text-redbrick font-semibold text-responsive-sm mt-1 text-center">
              {error}
            </div>
          )}
        </form>
        <div className="w-full max-w-xl flex items-center gap-2 text-darkslate/70 text-responsive-base mb-4">
          <span className="font-bold">Total URLs shortened:</span>{" "}
          <span className="bg-mustard px-2 py-1 rounded text-darkslate font-mono">
            {urls.length}
          </span>
        </div>
        <hr className="w-full max-w-xl border-t border-darkslate/10 mb-8" />
        <div className="w-full max-w-2xl space-y-6">
          {urls.length === 0 && (
            <div className="text-darkslate/60 italic text-center text-responsive-base">
              No URLs shortened yet. Try it out!
            </div>
          )}
          {urls.length > 0 && (
            <div
              key={urls[0].id}
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-darkslate/10 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden group"
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
                      <label className="text-xs font-semibold text-darkslate/60 uppercase tracking-wide mb-1 block">
                        Original URL
                      </label>
                      <div className="text-xs sm:text-sm lg:text-base text-darkslate font-medium break-all bg-darkslate/5 rounded-lg p-2 sm:p-3">
                        {urls[0].longUrl}
                      </div>
                    </div>

                    {/* Shortened URL */}
                    <div>
                      <label className="text-xs font-semibold text-darkslate/60 uppercase tracking-wide mb-1 block">
                        Shortened URL
                      </label>
                      <div className="flex items-center gap-1 bg-mustard/10 rounded-lg p-2 sm:p-2">
                        <a
                          href={urls[0].shortUrl}
                          className="text-mustard font-mono text-xs sm:text-sm lg:text-base break-all hover:text-redbrick transition-colors flex-1"
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
                    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-md border border-darkslate/10">
                      <QRCodeCanvas
                        value={urls[0].shortUrl}
                        size={qrSize}
                        bgColor="#FFF3B0"
                        fgColor="#335C67"
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
                        className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-darkslate/10 hover:bg-darkslate/20 text-darkslate rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
                        onClick={() => handleDownloadQR(urls[0].id)}
                        title="Download QR code"
                      >
                        <ArrowDownTrayOutlineIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-mustard/20 hover:bg-mustard/30 text-darkslate rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
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
      </main>
    </div>
  );
};

export default Shortify;
