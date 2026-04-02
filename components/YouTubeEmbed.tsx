"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getConfiguredYouTubeUrl,
  toYouTubeEmbedUrl,
} from "@/lib/youtube";

export function YouTubeEmbed() {
  const [mounted, setMounted] = useState(false);

  const embedSrc = useMemo(() => {
    const url = getConfiguredYouTubeUrl();
    return url ? toYouTubeEmbedUrl(url) : null;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-slate-50 text-slate-500">
        <p className="text-sm">動画を読み込み中…</p>
      </div>
    );
  }

  if (!embedSrc) {
    return (
      <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-2 bg-slate-50 px-6 text-center text-slate-600">
        <p className="text-sm font-medium">YouTube の動画 URL が未設定です</p>
        <p className="max-w-md text-xs text-slate-500">
          <code className="rounded bg-slate-200 px-1 py-0.5">lib/youtube.ts</code>{" "}
          の <code className="rounded bg-slate-200 px-1 py-0.5">FALLBACK_YOUTUBE_VIDEO_URL</code>{" "}
          に URL を貼り付けるか、
          <code className="rounded bg-slate-200 px-1 py-0.5">.env.local</code> に{" "}
          <code className="rounded bg-slate-200 px-1 py-0.5">
            NEXT_PUBLIC_YOUTUBE_VIDEO_URL
          </code>{" "}
          を設定してください。
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={embedSrc}
      className="h-full min-h-0 w-full flex-1 border-0"
      title="解説動画（YouTube）"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
