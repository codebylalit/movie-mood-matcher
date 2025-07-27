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
import { ArrowDownTrayIcon as ArrowDownTrayOutlineIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

const SHORTIFY_PREFIX = "https://shortify/";

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
};

const Shortify: React.FC = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
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
    localforage.setItem("shortify-urls", urls);
  }, [urls]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localforage.setItem("shortify-dark", dark);
  }, [dark]);

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
      const shortUrl = SHORTIFY_PREFIX + id;
      setUrls((prev) => [{ id, longUrl: url, shortUrl, clicks: 0 }, ...prev]);
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
              className="card flex flex-col md:flex-row md:items-center gap-4 justify-between border-2 border-darkslate/10 shadow-lg hover:shadow-2xl transition-shadow bg-white/95 hover:bg-mustard/10 group ring-0 hover:ring-2 hover:ring-mustard/60 duration-200 p-3 md:p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="text-darkslate font-semibold break-all text-responsive-base mb-1">
                  {urls[0].longUrl}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <a
                    href={urls[0].shortUrl}
                    className="text-mustard underline hover:text-redbrick transition text-responsive-base break-all"
                    onClick={(e) => {
                      e.preventDefault();
                      handleVisit(urls[0].id, urls[0].longUrl);
                    }}
                    tabIndex={0}
                    title="Open original URL"
                  >
                    {urls[0].shortUrl}
                  </a>
                  <button
                    className="btn btn-secondary px-2 py-1 text-responsive-sm hover:bg-mustard hover:text-darkslate transition"
                    onClick={() => handleCopy(urls[0].shortUrl, urls[0].id)}
                    title="Copy short URL"
                  >
                    {copiedId === urls[0].id ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="flex flex-row md:flex-col items-center gap-2 md:ml-4 justify-center">
                <QRCodeCanvas
                  value={urls[0].shortUrl}
                  size={56}
                  bgColor="#FFF3B0"
                  fgColor="#335C67"
                  level="H"
                  includeMargin={true}
                  ref={(el: HTMLCanvasElement | null) =>
                    (qrRefs.current[urls[0].id] = el)
                  }
                />
                <button
                  className="btn btn-primary px-2 py-1 text-responsive-sm mt-1 hover:bg-redbrick hover:text-vanilla transition w-full md:w-auto"
                  onClick={() => handleDownloadQR(urls[0].id)}
                  title="Download QR code as PNG"
                >
                  <ArrowDownTrayOutlineIcon className="w-5 h-5 inline-block" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shortify;
