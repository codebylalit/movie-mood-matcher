import React, { useEffect, useState, useRef } from "react";
import localforage from "localforage";
// @ts-ignore
import { QRCodeCanvas } from "qrcode.react";
import { SparklesIcon, LinkIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  TrashIcon,
  ShareIcon,
  ClipboardDocumentIcon,
  EyeIcon,
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(80);
  const qrRefs = useRef<{ [id: string]: HTMLCanvasElement | null }>({});

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

  const handleCopy = (shortUrl: string, id: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
    if (window.confirm("Are you sure you want to delete this link?")) {
      const filtered = urls.filter((u) => u.id !== id);
      setUrls(filtered);
      localforage.setItem("shortify-urls", filtered);
    }
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

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="w-full max-w-4xl mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LinkIcon className="w-8 h-8 text-mustard" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-darkslate">
                My Links
              </h1>
            </div>
            <p className="text-darkslate/70 text-base sm:text-lg max-w-2xl mx-auto">
              Manage and track all your shortened URLs in one place
            </p>
          </div>

          {/* Stats Section
          {urls.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 border border-darkslate/10 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-darkslate">
                    {urls.length}
                  </div>
                  <div className="text-sm sm:text-base text-darkslate/70">
                    Total Links
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-mustard">
                    {urls.reduce((sum, url) => sum + url.clicks, 0)}
                  </div>
                  <div className="text-sm sm:text-base text-darkslate/70">
                    Total Clicks
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-redbrick">
                    {Math.round(
                      (urls.reduce((sum, url) => sum + url.clicks, 0) /
                        urls.length) *
                        10
                    ) / 10}
                  </div>
                  <div className="text-sm sm:text-base text-darkslate/70">
                    Avg. Clicks
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Links Section */}
        <div className="w-full max-w-4xl space-y-3 sm:space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {urls.length === 0 ? (
            <div className="text-center py-8 sm:py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-12 border border-darkslate/10 shadow-lg">
                <LinkIcon className="w-12 h-12 sm:w-16 sm:h-16 text-darkslate/30 mx-auto mb-4" />
                <h3 className="text-lg sm:text-2xl font-semibold text-darkslate mb-2">
                  No Links Yet
                </h3>
                <p className="text-darkslate/60 text-sm sm:text-lg mb-6 max-w-md mx-auto">
                  Start creating shortened URLs to see them appear here!
                </p>
                <a
                  href="/"
                  className="btn btn-primary text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2"
                >
                  <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create Your First Link
                </a>
              </div>
            </div>
          ) : (
            urls.map((u) => (
              <div
                key={u.id}
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
                          {expandedId === u.id
                            ? u.longUrl
                            : truncateUrl(u.longUrl, 60)}
                          {u.longUrl.length > 60 && (
                            <button
                              onClick={() =>
                                setExpandedId(expandedId === u.id ? null : u.id)
                              }
                              className="ml-2 text-mustard hover:text-redbrick text-xs sm:text-sm font-medium"
                            >
                              {expandedId === u.id ? "Show less" : "Show more"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Shortened URL */}
                      <div>
                        <label className="text-xs font-semibold text-darkslate/60 uppercase tracking-wide mb-1 block">
                          Shortened URL
                        </label>
                        <div className="flex items-center gap-1 bg-mustard/10 rounded-lg p-2 sm:p-2">
                          <a
                            href={u.shortUrl}
                            className="text-mustard font-mono text-xs sm:text-sm lg:text-base break-all hover:text-redbrick transition-colors flex-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleVisit(u.id, u.longUrl);
                            }}
                            title="Click to visit the original URL"
                          >
                            {u.shortUrl}
                          </a>
                          <div className="flex gap-1 sm:gap-1">
                            <button
                              className="btn btn-secondary px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-mustard hover:text-darkslate transition-all duration-200 flex items-center gap-1 sm:gap-2"
                              onClick={() => handleCopy(u.shortUrl, u.id)}
                              title="Copy short URL"
                            >
                              {copiedId === u.id ? (
                                <>
                                  <ClipboardDocumentIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className=" sm:inline">Copied!</span>
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
                              onClick={() => handleVisit(u.id, u.longUrl)}
                              title="Visit original URL"
                            >
                              <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Visit</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Clicks Counter
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-darkslate/70">
                          <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>
                            {u.clicks} click{u.clicks !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div> */}
                    </div>

                    {/* QR Code and Actions - 30% width */}
                    <div
                      className="flex flex-col mt-2 items-center gap-3 sm:gap-4"
                      style={{ width: "30%" }}
                    >
                      {/* QR Code */}
                      <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-md border border-darkslate/10">
                        <QRCodeCanvas
                          value={u.shortUrl}
                          size={qrSize}
                          bgColor="#FFF3B0"
                          fgColor="#335C67"
                          level="H"
                          includeMargin={true}
                          ref={(el: HTMLCanvasElement | null) =>
                            (qrRefs.current[u.id] = el)
                          }
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex  gap-1.5 sm:gap-2">
                        <button
                          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-darkslate/10 hover:bg-darkslate/20 text-darkslate rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
                          onClick={() => handleDownloadQR(u.id)}
                          title="Download QR code"
                        >
                          <ArrowDownTrayIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {/* <span className="hidden sm:inline">Download QR</span> */}
                        </button>
                        <button
                          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-mustard/20 hover:bg-mustard/30 text-darkslate rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
                          onClick={() => handleShare(u.shortUrl)}
                          title="Share link"
                        >
                          <ShareIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {/* <span className="hidden sm:inline">Share</span> */}
                        </button>
                        <button
                          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-redbrick/10 hover:bg-redbrick/20 text-redbrick rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
                          onClick={() => handleDelete(u.id)}
                          title="Delete link"
                        >
                          <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {/* <span className="hidden sm:inline">Delete</span> */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MyLinks;
