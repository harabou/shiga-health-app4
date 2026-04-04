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

const BG_BASE = "#09090b";
const BG_SIDEBAR = "#0f0f12";
const BG_CARD = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const ACCENT = "#2563eb";
const ACCENT_LIGHT = "rgba(37,99,235,0.12)";
const ACCENT_BORDER = "rgba(37,99,235,0.25)";
const TEXT_PRIMARY = "rgba(255,255,255,0.9)";
const TEXT_SECONDARY = "rgba(255,255,255,0.5)";
const TEXT_MUTED = "rgba(255,255,255,0.3)";

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

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />
      </div>
      <div className="relative z-10 max-w-2xl w-full text-center space-y-10">
        <div className="space-y-5">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}` }}>
              <Activity className="w-8 h-8" style={{ color: ACCENT }} />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: TEXT_PRIMARY }}>
              健康寿命分析ポータル
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>
              滋賀県健康づくり施策構築支援システム<br />
              データ分析・可視化・シミュレーションを一元管理
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: <Database className="w-6 h-6" />, title: "データ分析", desc: "Tableauによる多角的な健康データ可視化" },
            { icon: <Video className="w-6 h-6" />, title: "活用ガイド", desc: "操作説明動画で使い方をサポート" },
            { icon: <Microscope className="w-6 h-6" />, title: "解析ツール", desc: "健康寿命シミュレーターで延伸効果を試算" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl p-6 text-left space-y-4"
              style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold mb-1.5" style={{ color: TEXT_PRIMARY }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onStart}
          className="px-12 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: ACCENT }}>
          データ分析を始める →
        </button>
      </div>
    </div>
  );
}

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
    <div className="flex h-screen w-full overflow-hidden font-sans" style={{ background: BG_BASE }}>
      <aside className={`${isSidebarOpen ? "w-72" : "w-0"} shrink-0 flex flex-col transition-all duration-300 overflow-hidden z-20`}
        style={{ background: BG_SIDEBAR, borderRight: `1px solid ${BORDER}` }}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-5 flex items-center gap-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}` }}>
              <Activity className="w-5 h-5" style={{ color: ACCENT }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: TEXT_PRIMARY }}>健康寿命分析</p>
              <p className="text-[11px]" style={{ color: TEXT_MUTED }}>滋賀県ポータル</p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
            <button onClick={() => setCurrent({ mode: "welcome" })}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"
              style={current.mode === "welcome"
                ? { background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: TEXT_PRIMARY }
                : { color: TEXT_SECONDARY }}>
              <Landmark className="h-4 w-4 shrink-0" style={{ color: current.mode === "welcome" ? ACCENT : undefined }} />
              <span>ホーム</span>
            </button>

            <div className="pt-5 pb-2 px-2">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TEXT_MUTED }}>データ分析</p>
            </div>
            {TABLEAU_VIZZES.map((v) => {
              const active = current.mode === "tableau" && current.id === v.id;
              return (
                <button key={v.id} onClick={() => handleSelectViz(v.id, v.label)}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all"
                  style={active
                    ? { background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: TEXT_PRIMARY }
                    : { color: TEXT_SECONDARY }}>
                  <BarChart3 className="h-4 w-4 shrink-0" style={{ color: active ? ACCENT : undefined }} />
                  <span className="text-left leading-tight">{v.label}</span>
                </button>
              );
            })}

            <div className="pt-5 pb-2 px-2">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TEXT_MUTED }}>活用ガイド</p>
            </div>
            {Object.keys(VIDEO_BASE).map((vid, idx) => {
              const active = current.mode === "video" && current.id === vid;
              return (
                <button key={vid} onClick={() => handleSelectVideo(vid, idx)}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"
                  style={active
                    ? { background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: TEXT_PRIMARY }
                    : { color: TEXT_SECONDARY }}>
                  <PlayCircle className="h-4 w-4 shrink-0" style={{ color: active ? ACCENT : undefined }} />
                  <span>動画{idx + 1}</span>
                </button>
              );
            })}

            <div className="pt-5 pb-2 px-2">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TEXT_MUTED }}>解析ツール</p>
            </div>
            <button onClick={() => setCurrent({ mode: "simulator", label: "健康寿命シミュレーター" })}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"
              style={current.mode === "simulator"
                ? { background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: TEXT_PRIMARY }
                : { color: TEXT_SECONDARY }}>
              <FlaskConical className="h-4 w-4 shrink-0" style={{ color: current.mode === "simulator" ? ACCENT : undefined }} />
              <span>健康寿命シミュレーター</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 flex items-center px-6 gap-4"
          style={{ borderBottom: `1px solid ${BORDER}`, background: BG_SIDEBAR }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl transition-all" style={{ color: TEXT_MUTED }}>
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 rounded-full" style={{ background: ACCENT }} />
            <span className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>{currentLabel}</span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          {current.mode === "welcome" && (
            <WelcomeScreen onStart={() => handleSelectViz("t0", "1　はじめに")} />
          )}
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
                <div className="h-16 shrink-0 flex items-center justify-between px-8"
                  style={{ borderTop: `1px solid ${BORDER}`, background: BG_SIDEBAR }}>
                  <button disabled={pageKey === 0} onClick={() => setPageKey((p) => p - 1)}
                    className="flex items-center gap-2 text-sm font-medium disabled:opacity-25 transition-all px-5 py-2.5 rounded-xl"
                    style={{ color: TEXT_SECONDARY, border: `1px solid ${BORDER}` }}>
                    <ChevronLeft className="w-4 h-4" /> 前のデータ
                  </button>
                  <span className="text-sm font-bold px-5 py-2 rounded-full"
                    style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                    PAGE {pageKey + 1} / {activeViz.viewPaths.length}
                  </span>
                  <button disabled={pageKey >= activeViz.viewPaths.length - 1} onClick={() => setPageKey((p) => p + 1)}
                    className="flex items-center gap-2 text-sm font-medium disabled:opacity-25 transition-all px-5 py-2.5 rounded-xl"
                    style={{ color: ACCENT, background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}` }}>
                    次のデータ <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
          {(current.mode === "video" || current.mode === "ext_viz") && (
            <div className="flex-1 p-6">
              <iframe key={current.url} src={current.url}
                className="w-full h-full rounded-2xl"
                style={{ border: `1px solid ${BORDER}` }}
                allow="autoplay; fullscreen" />
            </div>
          )}
          {current.mode === "simulator" && <HealthSimulator />}
        </div>
      </main>

      {/* 操作ガイドチャット */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {isChatOpen && (
          <div className="w-80 h-[500px] rounded-2xl flex flex-col overflow-hidden"
            style={{ background: BG_SIDEBAR, border: `1px solid ${BORDER}`, boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}>
            <div className="px-5 py-4 flex justify-between items-center shrink-0"
              style={{ borderBottom: `1px solid ${BORDER}` }}>
              <span className="text-sm font-bold flex items-center gap-2" style={{ color: TEXT_PRIMARY }}>
                <HelpCircle className="w-4 h-4" style={{ color: ACCENT }} /> 操作ガイド
              </span>
              <button onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-lg transition-all" style={{ color: TEXT_MUTED }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 px-4 py-4 overflow-y-auto space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-center pb-3 mb-1"
                style={{ color: TEXT_MUTED, borderBottom: `1px solid ${BORDER}` }}>
                動画シーン選択
              </p>
              {GUIDE_ITEMS.map((item, idx) => (
                <button key={idx} onClick={() => handleGuideAction(item)}
                  className="w-full text-left px-4 py-3 text-xs rounded-xl transition-all flex items-center gap-3"
                  style={{ color: TEXT_SECONDARY, background: BG_CARD, border: `1px solid ${BORDER}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT_BORDER; e.currentTarget.style.color = TEXT_PRIMARY; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_SECONDARY; }}>
                  <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: ACCENT }} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 rounded-2xl text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: ACCENT, boxShadow: `0 8px 30px ${ACCENT_LIGHT}` }}>
          {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
