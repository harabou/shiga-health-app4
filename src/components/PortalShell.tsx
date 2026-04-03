"use client";

import { useState } from "react";
import {
  Landmark, BarChart3, PlayCircle, MessageCircle, X, Clock,
  HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Menu,
  Activity, Database, Video, Microscope,
} from "lucide-react";
import { TableauEmbed } from "./TableauEmbed";
import { HealthSimulator } from "./HealthSimulator";
import { TABLEAU_VIZZES, toTableauEmbedUrl } from "@/lib/tableauVizzes";

// ==========================================
// ガイドアイテム型定義
// ==========================================
type GuideItemVideo = { label: string; type: "video"; vid: string; sec: number };
type GuideItemExternalViz = { label: string; type: "external_viz"; url: string };
type GuideItem = GuideItemVideo | GuideItemExternalViz;

const VIDEO_BASE: Record<string, string> = {
  v1: "https://www.youtube.com/embed/aPgdnFsd4ug",
  v2: "https://www.youtube.com/embed/9G5z-qVaVXE",
  v3: "https://www.youtube.com/embed/04HBEEzHB14",
};

const GUIDE_ITEMS: GuideItem[] = [
  { label: "サイトの構成", vid: "v1", sec: 18, type: "video" },
  { label: "グラフの操作方法", vid: "v1", sec: 485, type: "video" },
  { label: "深掘り解析", vid: "v1", sec: 538, type: "video" },
  { label: "市町診断", vid: "v1", sec: 678, type: "video" },
  { label: "データの出典", type: "external_viz", url: "https://public.tableau.com/views/_17699983935030/1_2?:embed=y&:display_count=y&:showVizHome=no" },
  { label: "PDF・画像保存", vid: "v1", sec: 723, type: "video" },
  { label: "トップページへの戻り方", vid: "v1", sec: 804, type: "video" },
  { label: "お問い合わせ先", vid: "v1", sec: 876, type: "video" },
];

type CurrentView =
  | { mode: "welcome" }
  | { mode: "tableau"; id: string; label: string }
  | { mode: "video"; id: string; url: string; label: string }
  | { mode: "ext_viz"; url: string; label: string }
  | { mode: "simulator"; label: string };

// ==========================================
// ウェルカム画面
// ==========================================
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* ロゴ・タイトル */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <Activity className="w-7 h-7 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            健康寿命分析ポータル
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            滋賀県健康づくり施策構築支援システム<br />
            データ分析・可視化・シミュレーションを一元管理
          </p>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Database className="w-6 h-6 text-sky-400" />, title: "データ分析", desc: "Tableauによる多角的な健康データ可視化", color: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" },
            { icon: <Video className="w-6 h-6 text-violet-400" />, title: "活用ガイド", desc: "操作説明動画で使い方をサポート", color: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
            { icon: <Microscope className="w-6 h-6 text-emerald-400" />, title: "解析ツール", desc: "健康寿命シミュレーターで延伸効果を試算", color: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl p-5 text-left space-y-3"
              style={{ background: item.color, border: `1px solid ${item.border}`, backdropFilter: "blur(10px)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: item.color, border: `1px solid ${item.border}` }}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* スタートボタン */}
        <button onClick={onStart}
          className="px-10 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", boxShadow: "0 0 30px rgba(16,185,129,0.3)" }}>
          データ分析を始める →
        </button>
      </div>
    </div>
  );
}

// ==========================================
// メインコンポーネント
// ==========================================
export function PortalShell() {
  const [current, setCurrent] = useState<CurrentView>({ mode: "welcome" });
  const [pageKey, setPageKey] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelectViz = (id: string, label: string) => { setCurrent({ mode: "tableau", id, label }); setPageKey(0); };
  const handleSelectVideo = (vid: string, idx: number) => { setCurrent({ mode: "video", id: vid, url: `${VIDEO_BASE[vid]}?start=0`, label: `動画${idx + 1}` }); setPageKey(0); };
  const handleGuideAction = (item: GuideItem) => {
    if (item.type === "external_viz") { setCurrent({ mode: "ext_viz", url: item.url, label: item.label }); return; }
    setCurrent({ mode: "video", id: item.vid, url: `${VIDEO_BASE[item.vid]}?start=${item.sec}&autoplay=1`, label: item.label });
  };

  const activeViz = current.mode === "tableau" ? TABLEAU_VIZZES.find((v) => v.id === current.id) : undefined;
  const currentLabel = current.mode === "welcome" ? "ホーム" :
    current.mode === "tableau" || current.mode === "simulator" ? current.label :
    current.mode === "video" || current.mode === "ext_viz" ? current.label : "";

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f1f3d 50%, #0d1a2e 100%)" }}>

      {/* サイドバー */}
      <aside className={`${isSidebarOpen ? "w-72" : "w-0"} shrink-0 flex flex-col transition-all duration-300 overflow-hidden z-20`}
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col h-full" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}>
          {/* ロゴ */}
          <div className="p-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-sm font-bold leading-tight">健康寿命分析</p>
              <p className="text-white/30 text-[10px]">滋賀県ポータル</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {/* ホーム */}
            <button onClick={() => setCurrent({ mode: "welcome" })}
              className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm transition-all ${current.mode === "welcome" ? "text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
              style={current.mode === "welcome" ? { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" } : {}}>
              <Landmark className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>ホーム</span>
            </button>

            {/* データ分析 */}
            <div className="pt-4 pb-1.5 px-3">
              <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(56,189,248,0.5)" }}>
                データ分析
              </p>
            </div>
            {TABLEAU_VIZZES.map((v) => (
              <button key={v.id} onClick={() => handleSelectViz(v.id, v.label)}
                className={`flex w-full items-center gap-3 p-3 rounded-xl text-xs transition-all ${current.mode === "tableau" && current.id === v.id ? "text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
                style={current.mode === "tableau" && current.id === v.id ? { background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.2)" } : {}}>
                <BarChart3 className="h-4 w-4 shrink-0 text-sky-400" />
                <span className="text-left leading-tight">{v.label}</span>
              </button>
            ))}

            {/* 動画ガイド */}
            <div className="pt-4 pb-1.5 px-3">
              <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.5)" }}>
                活用ガイド
              </p>
            </div>
            {Object.keys(VIDEO_BASE).map((vid, idx) => (
              <button key={vid} onClick={() => handleSelectVideo(vid, idx)}
                className={`flex w-full items-center gap-3 p-3 rounded-xl text-xs transition-all ${current.mode === "video" && current.id === vid ? "text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
                style={current.mode === "video" && current.id === vid ? { background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.2)" } : {}}>
                <PlayCircle className="h-4 w-4 shrink-0 text-violet-400" />
                <span>動画{idx + 1}</span>
              </button>
            ))}

            {/* 解析ツール */}
            <div className="pt-4 pb-1.5 px-3">
              <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(16,185,129,0.5)" }}>
                解析ツール
              </p>
            </div>
            <button onClick={() => setCurrent({ mode: "simulator", label: "健康寿命シミュレーター" })}
              className={`flex w-full items-center gap-3 p-3 rounded-xl text-xs transition-all ${current.mode === "simulator" ? "text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
              style={current.mode === "simulator" ? { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" } : {}}>
              <FlaskConical className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>健康寿命シミュレーター</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* メインエリア */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* ヘッダー */}
        <header className="h-13 shrink-0 flex items-center px-5 gap-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl transition-all hover:bg-white/10 text-white/50 hover:text-white">
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full" style={{ background: "linear-gradient(to bottom, #10b981, #3b82f6)" }} />
            <span className="text-sm font-bold text-white/80">{currentLabel}</span>
          </div>
        </header>

        {/* コンテンツ */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* ウェルカム画面 */}
          {current.mode === "welcome" && (
            <WelcomeScreen onStart={() => handleSelectViz("t0", "1　はじめに")} />
          )}

          {/* Tableau */}
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
                <div className="h-14 shrink-0 flex items-center justify-between px-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}>
                  <button disabled={pageKey === 0} onClick={() => setPageKey((p) => p - 1)}
                    className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white disabled:opacity-20 transition-all px-4 py-2 rounded-xl hover:bg-white/10">
                    <ChevronLeft className="w-4 h-4" /> 前のデータ
                  </button>
                  <span className="text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", color: "rgba(56,189,248,0.9)" }}>
                    PAGE {pageKey + 1} / {activeViz.viewPaths.length}
                  </span>
                  <button disabled={pageKey >= activeViz.viewPaths.length - 1} onClick={() => setPageKey((p) => p + 1)}
                    className="flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 disabled:opacity-20 transition-all px-4 py-2 rounded-xl hover:bg-white/10">
                    次のデータ <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* 動画・外部 */}
          {(current.mode === "video" || current.mode === "ext_viz") && (
            <div className="flex-1 p-4">
              <iframe key={current.url} src={current.url}
                className="w-full h-full rounded-2xl border"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                allow="autoplay; fullscreen" />
            </div>
          )}

          {/* シミュレーター */}
          {current.mode === "simulator" && <HealthSimulator />}
        </div>
      </main>

      {/* ガイドチャット */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-80 h-[480px] rounded-3xl flex flex-col overflow-hidden"
            style={{ background: "rgba(10,22,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
            <div className="p-4 flex justify-between items-center shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> 操作ガイド
              </span>
              <button onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest text-center pb-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                動画シーン選択
              </p>
              {GUIDE_ITEMS.map((item, idx) => (
                <button key={idx} onClick={() => handleGuideAction(item)}
                  className="w-full text-left p-3 text-[11px] rounded-xl transition-all flex items-center gap-2 group text-white/50 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.1)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 rounded-2xl text-white transition-all hover:scale-110 active:scale-95"
          style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", boxShadow: "0 8px 30px rgba(16,185,129,0.4)" }}>
          {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
