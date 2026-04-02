"use client";

import { useEffect, useState } from "react";

type Props = {
  embedSrc: string;
  title: string;
  /** 同一URLでもページ切替で iframe を再マウントするためのキー */
  pageKey: number;
};

export function TableauEmbed({ embedSrc, title, pageKey }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full min-h-[480px] w-full items-center justify-center bg-slate-50 text-slate-500">
        <p className="text-sm">Tableau を読み込み中…</p>
      </div>
    );
  }

  return (
    <iframe
      key={`${embedSrc}__${pageKey}`}
      src={embedSrc}
      className="h-full min-h-0 w-full flex-1 border-0"
      title={title}
      allowFullScreen
    />
  );
}
