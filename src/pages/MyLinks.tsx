import React, { useEffect, useState, useRef } from "react";
import localforage from "localforage";
// @ts-ignore
import { QRCodeCanvas } from "qrcode.react";
import { SparklesIcon } from "@heroicons/react/24/solid";

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-vanilla via-mustard/15 flex flex-col ">
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6 sm:py-10">
        <h1 className="text-2xl font-bold text-darkslate mb-6">My Links</h1>
        <div className="w-full max-w-2xl space-y-6">
          {urls.length === 0 && (
            <div className="text-darkslate/60 italic text-center">
              No URLs found. Go to Home to create some!
            </div>
          )}
          {urls.map((u) => (
            <div
              key={u.id}
              className="card flex flex-col md:flex-row md:items-center gap-4 justify-between border-2 border-darkslate/10 shadow-lg hover:shadow-2xl transition-shadow bg-white/95 hover:bg-mustard/10 group ring-0 hover:ring-2 hover:ring-mustard/60 duration-200 p-3 md:p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="text-darkslate font-semibold break-all text-base sm:text-lg mb-1">
                  {u.longUrl}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <a
                    href={u.shortUrl}
                    className="text-mustard underline hover:text-redbrick transition text-base sm:text-lg break-all"
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
                <button
                  className="btn btn-primary px-2 py-1 text-xs mt-1 hover:bg-redbrick hover:text-vanilla transition w-full md:w-auto"
                  onClick={() => handleDownloadQR(u.id)}
                  title="Download QR code as PNG"
                >
                  ⬇️ Download QR
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyLinks;
