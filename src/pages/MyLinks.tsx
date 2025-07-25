import React, { useEffect, useState, useRef } from "react";
import localforage from "localforage";
// @ts-ignore
import { QRCodeCanvas } from "qrcode.react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  TrashIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

type ShortUrl = {
  id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
};

const MyLinks: React.FC = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const qrRefs = useRef<{ [id: string]: HTMLCanvasElement | null }>({});

  useEffect(() => {
    localforage.getItem("shortify-urls").then((stored: unknown) => {
      if (stored) setUrls(stored as ShortUrl[]);
    });
  }, []);

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
    localforage.setItem(
      "shortify-urls",
      urls.map((u) => (u.id === id ? { ...u, clicks: u.clicks + 1 } : u))
    );
  };

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

  const handleDelete = (id: string) => {
    const filtered = urls.filter((u) => u.id !== id);
    setUrls(filtered);
    localforage.setItem("shortify-urls", filtered);
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fdf6e3] to-[#f6e7c1] flex flex-col relative overflow-x-hidden">
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6 sm:py-10">
        <h1 className="text-3xl font-bold text-darkslate mb-8 font-serif tracking-wider">
          My Links Diary
        </h1>
        <div className="w-full max-w-2xl relative">
          {/* Notebook lines */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="border-b border-yellow-200 opacity-40"
                style={{
                  top: `${i * 48}px`,
                  position: "absolute",
                  width: "100%",
                }}
              />
            ))}
          </div>
          <div className="relative z-10 space-y-8">
            {urls.length === 0 && (
              <div className="text-darkslate/60 italic text-center">
                No URLs found. Go to Home to create some!
              </div>
            )}
            {urls.map((u) => (
              <div
                key={u.id}
                className="bg-white/90 border-2 border-yellow-300 shadow-lg rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 relative group hover:bg-yellow-50 transition-all duration-200"
                style={{
                  boxShadow: "0 2px 8px 0 #f6e7c1, 0 1.5px 0 0 #e9c46a",
                }}
              >
                {/* Spiral binding effect */}
                <div className="absolute -left-4 top-6 flex flex-col gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-yellow-300 border border-yellow-400 shadow"
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-lg font-bold text-darkslate mb-1 break-all">
                    {u.longUrl}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <a
                      href={u.shortUrl}
                      className="text-mustard underline hover:text-redbrick transition text-base sm:text-lg break-all font-mono"
                      onClick={(e) => {
                        e.preventDefault();
                        handleVisit(u.id, u.longUrl);
                      }}
                      tabIndex={0}
                      title="Open original URL"
                    >
                      {u.shortUrl}
                    </a>
                    <button
                      className="btn btn-secondary px-2 py-1 text-xs sm:text-sm hover:bg-mustard hover:text-darkslate transition"
                      onClick={() => handleCopy(u.shortUrl, u.id)}
                      title="Copy short URL"
                    >
                      {copiedId === u.id ? "Copied!" : "Copy"}
                    </button>
                    <span className="ml-2 text-xs text-darkslate/60">
                      Clicks: {u.clicks}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center gap-2 md:ml-4 justify-center">
                  <QRCodeCanvas
                    value={u.shortUrl}
                    size={56}
                    bgColor="#FFF3B0"
                    fgColor="#335C67"
                    level="H"
                    includeMargin={true}
                    ref={(el: HTMLCanvasElement | null) =>
                      (qrRefs.current[u.id] = el)
                    }
                  />
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      className="p-2 rounded-full hover:bg-yellow-200 transition"
                      onClick={() => handleDownloadQR(u.id)}
                      title="Download QR code as PNG"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5 text-darkslate" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-yellow-200 transition"
                      onClick={() => handleShare(u.shortUrl)}
                      title="Share link"
                    >
                      <ShareIcon className="w-5 h-5 text-darkslate" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-red-100 transition"
                      onClick={() => handleDelete(u.id)}
                      title="Delete link"
                    >
                      <TrashIcon className="w-5 h-5 text-redbrick" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLinks;
