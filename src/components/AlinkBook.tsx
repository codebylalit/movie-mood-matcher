import React from "react";

export interface ShortUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
}

interface AlinkBookProps {
  urls: ShortUrl[];
  onVisit: (id: string, url: string) => void;
  onCopy: (shortUrl: string, id: string) => void;
  copiedId: string | null;
}

const AlinkBook: React.FC<AlinkBookProps> = ({
  urls,
  onVisit,
  onCopy,
  copiedId,
}) => {
  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white/95 shadow-2xl border-l border-darkslate/10 z-40 flex flex-col p-4 overflow-y-auto diary-sidebar">
      <h2 className="text-2xl font-bold mb-4 text-mustard font-serif border-b pb-2 border-mustard/30">
        Alink Book
      </h2>
      {urls.length === 0 ? (
        <div className="text-darkslate/60 italic text-center mt-8">
          No links saved yet.
        </div>
      ) : (
        <ul className="space-y-4">
          {urls.map((u) => (
            <li
              key={u.id}
              className="bg-vanilla/80 rounded-lg p-3 shadow border border-darkslate/10 hover:bg-mustard/10 transition-all"
            >
              <div className="truncate text-darkslate font-semibold text-base mb-1">
                {u.longUrl}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <a
                  href={u.shortUrl}
                  className="text-mustard underline hover:text-redbrick transition text-base"
                  onClick={(e) => {
                    e.preventDefault();
                    onVisit(u.id, u.longUrl);
                  }}
                  tabIndex={0}
                  title="Open original URL"
                >
                  {u.shortUrl}
                </a>
                <button
                  className="btn btn-secondary px-2 py-1 text-xs hover:bg-mustard hover:text-darkslate transition"
                  onClick={() => onCopy(u.shortUrl, u.id)}
                  title="Copy short URL"
                >
                  {copiedId === u.id ? "Copied!" : "Copy"}
                </button>
                <span className="ml-2 text-xs text-darkslate/60">
                  Clicks: {u.clicks}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default AlinkBook;
