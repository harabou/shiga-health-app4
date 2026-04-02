"use client";

import { useState } from "react";
import { Landmark, BarChart3, PlayCircle, MessageCircle, X, Clock, HelpCircle, ExternalLink } from "lucide-react";
import { TableauEmbed } from "./TableauEmbed";
import { TABLEAU_VIZZES, toTableauEmbedUrl } from "@/lib/tableauVizzes";

const OMI_NAVY = "#151f33";

// ==========================================
// 1. 【確定リスト】画像の時間 + 指定のTableau URL
// ==========================================
const GUIDE_ITEMS = [
  { label: "サイトの構成", vid: "v1", sec: 18, type: "video" },             // 0:18
  { label: "グラフの操作方法", vid: "v1", sec: 485, type: "video" },       // 8:05
  { label: "深掘り解析", vid: "v1", sec: 538, type: "video" },           // 8:58
  { label: "市町診断", vid: "v1", sec: 678, type: "video" },             // 11:18
  { 
    label: "データの出典", 
    type: "external_viz", 
    url: "https://public.tableau.com/views/_17699983935030/1_2?:embed=y&:display_count=y&:showVizHome=no" 
  },
  { label: "PDF・画像保存", vid: "v1", sec: 723, type: "video" },          // 12:03
  { label: "トップページへの戻り方", vid: "v1", sec: 804, type: "video" },   // 13:24
  { label: "お問い合わせ先", vid: "v1", sec: 876, type: "video" },         // 14:36
  { label: "分析の活用事例１", vid: "v2", sec: 401, type: "video" },       // 6:41
  { label: "分析の活用事例２", vid: "v2", sec: 567, type: "video" },       // 9:27
];

const VIDEO_BASE = {
  v1: "https://www.youtube.com/embed/aPgdnFsd4ug",
  v2: "https://www.youtube.com/embed/9G5z-qVaVXE",
};

export function PortalShell() {
  const [current, setCurrent] = useState({
    id: "t0",
    url: `${VIDEO_BASE.v1}?start=0`,
    label: "滋賀県健康寿命分析ポータル"
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "ai", content: "操作ガイドです。項目を選択してください。" }]);

  const handleAction = (item: any) => {
    // A. データの出典（外部Tableau）の処理
    if (item.type === "external_viz") {
      setMessages(prev => [...prev, { role: "user", content: item.label }, { role: "ai", content: "データの出典元（Tableau Public）を表示します。" }]);
      setCurrent({ id: "ext_viz", url: item.url, label: "データの出典" });
      return;
    }

    // B. ビデオジャンプ処理
    const baseUrl = VIDEO_BASE[item.vid as keyof typeof VIDEO_BASE];
    const fullUrl = `${baseUrl}?start=${item.sec}&autoplay=1`;
    
    setMessages(prev => [...prev, { role: "user", content: item.label }, { role: "ai", content: `${item.label}の解説箇所を再生します。` }]);
    setCurrent({ id: item.vid, url: fullUrl, label: item.label });
  };

  const activeViz = TABLEAU_VIZZES.find(v => v.id === current.id);
  const isVideoOrExtMode = ["v1", "v2", "ext_viz"].includes(current.id);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden text-slate-900">
      {/* サイドバー */}
      <aside className="w-80 shrink-0 flex flex-col text-white shadow-xl z-20" style={{ backgroundColor: OMI_NAVY }}>
        <div className="p-6 border-b border-white/10 flex items-center gap-3 shrink-0">
          <Landmark className="h-6 w-6 text-sky-300" />
          <h1 className="font-bold text-lg leading-tight">健康寿命<br/>分析ポータル</h1>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {TABLEAU_VIZZES.map(v => (
            <button key={v.id} onClick={() => setCurrent({ id: v.id, url: "", label: v.label })} className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm transition-all ${current.id === v.id ? "bg-sky-500/20 ring-1 ring-sky-400" : "text-white/60 hover:bg-white/5"}`}>
              <BarChart3 className="h-5 w-5 text-sky-400" />{v.label}
            </button>
          ))}
          <div className="pt-6 pb-2 px-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">Guide Videos</div>
          <button onClick={() => setCurrent({ id: "v1", url: `${VIDEO_BASE.v1}?start=0`, label: "基本操作説明" })} className={`flex w-full items-center gap-3 p-3 rounded-xl text-sm ${current.id === "v1" ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5"}`}><PlayCircle className="h-5 w-5" />動画1：基本操作</button>
        </nav>
      </aside>

      {/* メインエリア */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b flex items-center px-8 shadow-sm shrink-0">
          <span className="text-sm font-bold border-l-4 border-blue-600 pl-3">{current.label}</span>
        </header>
        <div className="flex-1 relative bg-slate-100 overflow-hidden">
          {activeViz && (
            <TableauEmbed key={activeViz.id} embedSrc={toTableauEmbedUrl(activeViz.viewPaths[0])} pageKey={0} title={current.label} />
          )}
          {isVideoOrExtMode && (
            <div className="absolute inset-0 bg-white flex items-center justify-center p-4">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-200">
                <iframe 
                  key={current.url} 
                  src={current.url} 
                  className="w-full h-full" 
                  allow="autoplay; fullscreen" 
                  frameBorder="0"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ガイドチャット */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-80 h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
              <span className="text-xs font-bold flex items-center gap-2"><HelpCircle className="w-4 h-4 text-sky-400" /> 操作ガイド</span>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 text-[11px] leading-relaxed rounded-2xl shadow-sm ${m.role === "user" ? "bg-blue-600 text-white" : "bg-white border text-slate-600"}`}>{m.content}</div>
                </div>
              ))}
              <div className="space-y-1.5 pt-4">
                <p className="text-[9px] text-slate-400 font-bold uppercase text-center border-b pb-1 mb-2">メニュー</p>
                {GUIDE_ITEMS.map((item, idx) => (
                  <button key={idx} onClick={() => handleAction(item)} className="w-full text-left p-2.5 text-[11px] bg-white border border-slate-100 rounded-xl hover:border-blue-500 hover:text-blue-600 flex items-center gap-2 group transition-all shadow-sm">
                    {item.type === "video" ? <Clock className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500" /> : <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`p-4 rounded-full shadow-2xl transition-all ${isChatOpen ? "bg-slate-200 text-slate-600" : "bg-blue-600 text-white ring-4 ring-blue-600/10"}`}>
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}