"use client";

import { useState } from "react";
import {
  Landmark,
  BarChart3,
  PlayCircle,
  MessageCircle,
  X,
  Clock,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { TableauEmbed } from "./TableauEmbed";
import { TABLEAU_VIZZES, toTableauEmbedUrl } from "@/lib/tableauVizzes";

const OMI_NAVY = "#151f33";

// 動画ベースURL
const VIDEO_BASE: Record<string, string> = {
  v1: "https://www.youtube.com/embed/aPgdnFsd4ug",
  v2: "https://www.youtube.com/embed/9G5z-qVaVXE",
  v3: "https://www.youtube.com/embed/04HBEEzHB14",
};

// 操作ガイド項目の型定義
type GuideItemVideo = {
  label: string;
  type: "video";
  vid: string;
  sec: number;
};
type GuideItemExternalViz = {
  label: string;
  type: "external_viz";
  url: string;
};
type GuideItem = GuideItemVideo | GuideItemExternalViz;

// 操作ガイド用の項目
const GUIDE_ITEMS: GuideItem[] = [
  { label: "サイトの構成", vid: "v1", sec: 18, type: "video" },
  { label: "グラフの操作方法", vid: "v1", sec: 485, type: "video" },
  { label: "深掘り解析", vid: "v1", sec: 538, type: "video" },
  { label: "市町診断", vid: "v1", sec: 678, type: "video" },
  {
    label: "データの出典",
    type: "external_viz",
    url: "https://public.tableau.com/views/_17699983935030/1_2?:embed=y&:display_count=y&:showVizHome=no",
  },
  { label: "PDF・画像保存", vid: "v1", sec: 723, type: "video" },
  { label: "トップページへの戻り方", vid: "v1", sec: 804, type: "video" },
  { label: "お問い合わせ先", vid: "v1", sec: 876, type: "video" },
];

// 現在表示中のコンテンツの型
type CurrentView =
  | { mode: "tableau"; id: string; label: string }
  | { mode: "video"; id: string; url: string; label: string }
  | { mode: "ext_viz"; url: string; label: string }
  | { mode: "simulator"; label: string };

export function PortalShell() {
  const [current, setCurrent] = useState<CurrentView>({
    mode: "tableau",
    id: "t0",
    label: "1　はじめに",
  });
  const [pageKey, setPageKey] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // サイドバー：Tableauメニュー選択
  const handleSelectViz = (id: string, label: string) => {
    setCurrent({ mode: "tableau", id, label });
    setPageKey(0);
  };

  // サイドバー：動画選択
  const handleSelectVideo = (vid: string, idx: number) => {
    setCurrent({
      mode: "video",
      id: vid,
      url: `${VIDEO_BASE[vid]}?start=0`,
      label: `動画${idx + 1}`,
    });
    setPageKey(0);
  };

  // ガイドメニューからのアクション
  const handleGuideAction = (item: GuideItem) => {
    if (item.type === "external_viz") {
      setCurrent({ mode: "ext_viz", url: item.url, label: item.label });
      return;
    }
    const baseUrl = VIDEO_BASE[item.vid];
    setCurrent({
      mode: "video",
      id: item.vid,
      url: `${baseUrl}?start=${item.sec}&autoplay=1`,
      label: item.label,
    });
  };

  // 現在のTableauビズ情報
  const activeViz =
    current.mode === "tableau"
      ? TABLEAU_VIZZES.find((v) => v.id === current.id)
      : undefined;

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden text-slate-900">
      {/* サイドバー */}
      <aside
        className="w-80 shrink-0 flex flex-col text-white shadow-xl z-20"
        style={{ backgroundColor: OMI_NAVY }}
      >
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <Landmark className="h-6 w-6 text-sky-300" />
          <h1 className="font-bold text-lg leading-tight">
            健康寿命分析ポータル
          </h1>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {/* Tableauメインメニュー */}
          {TABLEAU_VIZZES.map((v) => (
            <button
              key={v.id}
              onClick={() => handleSelectViz(v.id, v.label)}
              className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm transition-all ${
                current.mode === "tableau" && current.id === v.id
                  ? "bg-sky-500/20 ring-1 ring-sky-400 text-white"
                  : "text-white/60 hover:bg-white/5"
              }`}
            >
              <BarChart3 className="h-5 w-5 shrink-0 text-sky-400" />
              <span className="text-left">{v.label}</span>
            </button>
          ))}

          {/* 動画メニュー */}
          <div className="pt-6 pb-2 px-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">
            Guide Videos
          </div>
          {Object.keys(VIDEO_BASE).map((vid, idx) => (
            <button
              key={vid}
              onClick={() => handleSelectVideo(vid, idx)}
              className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm ${
                current.mode === "video" && current.id === vid
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5"
              }`}
            >
              <PlayCircle className="h-5 w-5 shrink-0" />
              動画{idx + 1}
            </button>
          ))}

          {/* 解析ツールメニュー */}
          <div className="pt-6 pb-2 px-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">
            解析ツール
          </div>
          <button
            onClick={() =>
              setCurrent({ mode: "simulator", label: "健康寿命シミュレーター" })
            }
            className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm transition-all ${
              current.mode === "simulator"
                ? "bg-emerald-500/20 ring-1 ring-emerald-400 text-white"
                : "text-white/40 hover:bg-white/5"
            }`}
          >
            <FlaskConical className="h-5 w-5 shrink-0 text-emerald-400" />
            <span className="text-left">健康寿命シミュレーター</span>
          </button>
        </nav>
      </aside>

      {/* メインエリア */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b flex items-center px-8 shadow-sm shrink-0">
          <span className="text-sm font-bold border-l-4 border-blue-600 pl-3">
            {current.label}
          </span>
        </header>

        <div className="flex-1 relative bg-slate-100 overflow-hidden flex flex-col">
          {/* Tableau表示モード */}
          {current.mode === "tableau" && activeViz && (
            <>
              <div className="flex-1 min-h-0">
                <TableauEmbed
                  key={`${activeViz.id}-${pageKey}`}
                  embedSrc={toTableauEmbedUrl(activeViz.viewPaths[pageKey])}
                  title={current.label}
                  pageKey={pageKey}
                />
              </div>
              {activeViz.viewPaths.length > 1 && (
                <div className="h-14 bg-white border-t flex items-center justify-between px-6 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                  <button
                    disabled={pageKey === 0}
                    onClick={() => setPageKey((p) => p - 1)}
                    className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 disabled:opacity-20 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> 前のデータ
                  </button>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border">
                    PAGE {pageKey + 1} / {activeViz.viewPaths.length}
                  </span>
                  <button
                    disabled={pageKey >= activeViz.viewPaths.length - 1}
                    onClick={() => setPageKey((p) => p + 1)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-20 transition-colors"
                  >
                    次のデータ <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* 動画・外部サイト表示モード */}
          {(current.mode === "video" || current.mode === "ext_viz") && (
            <div className="absolute inset-0 bg-white p-4">
              <iframe
                key={current.url}
                src={current.url}
                className="w-full h-full rounded-xl shadow-lg border border-slate-200"
                allow="autoplay; fullscreen"
              />
            </div>
          )}

          {/* シミュレーター：準備中 */}
          {current.mode === "simulator" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-12 flex flex-col items-center gap-4 max-w-md w-full text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <FlaskConical className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  健康寿命シミュレーター
                </h2>
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  準備中
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  血圧・喫煙・糖尿病・BMIの改善による<br />
                  健康寿命の延伸効果をシミュレーションできるツールです。<br />
                  近日公開予定です。
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 右下ガイドチャット */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-80 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
              <span className="text-xs font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-400" /> 操作ガイド
              </span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
              <div className="space-y-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center border-b pb-2">
                  動画シーン選択
                </p>
                {GUIDE_ITEMS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGuideAction(item)}
                    className="w-full text-left p-3 text-[11px] bg-white border border-slate-100 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2 shadow-sm group"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all ring-4 ring-blue-600/10"
        >
          {isChatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
