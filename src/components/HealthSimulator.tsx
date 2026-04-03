"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// デザイントークン
const BG_CARD = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const ACCENT = "#2563eb";
const ACCENT_LIGHT = "rgba(37,99,235,0.12)";
const ACCENT_BORDER = "rgba(37,99,235,0.25)";
const TEXT_PRIMARY = "rgba(255,255,255,0.9)";
const TEXT_SECONDARY = "rgba(255,255,255,0.55)";
const TEXT_MUTED = "rgba(255,255,255,0.35)";

const RAW_DATA = [
  { year: 20.29, sex: "M", BP: 1, SM: 1, DM: 1, BMI: 1 },
  { year: 22.62, sex: "M", BP: 1, SM: 1, DM: 1, BMI: 2 },
  { year: 23.86, sex: "M", BP: 1, SM: 1, DM: 1, BMI: 3 },
  { year: 21.97, sex: "M", BP: 1, SM: 1, DM: 1, BMI: 4 },
  { year: 18.74, sex: "M", BP: 1, SM: 2, DM: 1, BMI: 1 },
  { year: 20.98, sex: "M", BP: 1, SM: 2, DM: 1, BMI: 2 },
  { year: 22.1,  sex: "M", BP: 1, SM: 2, DM: 1, BMI: 3 },
  { year: 20.47, sex: "M", BP: 1, SM: 2, DM: 1, BMI: 4 },
  { year: 16.73, sex: "M", BP: 1, SM: 3, DM: 1, BMI: 1 },
  { year: 18.76, sex: "M", BP: 1, SM: 3, DM: 1, BMI: 2 },
  { year: 19.87, sex: "M", BP: 1, SM: 3, DM: 1, BMI: 3 },
  { year: 18.07, sex: "M", BP: 1, SM: 3, DM: 1, BMI: 4 },
  { year: 19.5,  sex: "M", BP: 2, SM: 1, DM: 1, BMI: 1 },
  { year: 22.01, sex: "M", BP: 2, SM: 1, DM: 1, BMI: 2 },
  { year: 23.09, sex: "M", BP: 2, SM: 1, DM: 1, BMI: 3 },
  { year: 21.06, sex: "M", BP: 2, SM: 1, DM: 1, BMI: 4 },
  { year: 18.02, sex: "M", BP: 2, SM: 2, DM: 1, BMI: 1 },
  { year: 20.27, sex: "M", BP: 2, SM: 2, DM: 1, BMI: 2 },
  { year: 21.32, sex: "M", BP: 2, SM: 2, DM: 1, BMI: 3 },
  { year: 19.61, sex: "M", BP: 2, SM: 2, DM: 1, BMI: 4 },
  { year: 16.02, sex: "M", BP: 2, SM: 3, DM: 1, BMI: 1 },
  { year: 18.09, sex: "M", BP: 2, SM: 3, DM: 1, BMI: 2 },
  { year: 19.12, sex: "M", BP: 2, SM: 3, DM: 1, BMI: 3 },
  { year: 17.26, sex: "M", BP: 2, SM: 3, DM: 1, BMI: 4 },
  { year: 18.04, sex: "M", BP: 3, SM: 1, DM: 1, BMI: 1 },
  { year: 20.77, sex: "M", BP: 3, SM: 1, DM: 1, BMI: 2 },
  { year: 21.57, sex: "M", BP: 3, SM: 1, DM: 1, BMI: 3 },
  { year: 19.86, sex: "M", BP: 3, SM: 1, DM: 1, BMI: 4 },
  { year: 16.56, sex: "M", BP: 3, SM: 2, DM: 1, BMI: 1 },
  { year: 18.88, sex: "M", BP: 3, SM: 2, DM: 1, BMI: 2 },
  { year: 19.7,  sex: "M", BP: 3, SM: 2, DM: 1, BMI: 3 },
  { year: 18.42, sex: "M", BP: 3, SM: 2, DM: 1, BMI: 4 },
  { year: 14.83, sex: "M", BP: 3, SM: 3, DM: 1, BMI: 1 },
  { year: 16.98, sex: "M", BP: 3, SM: 3, DM: 1, BMI: 2 },
  { year: 17.83, sex: "M", BP: 3, SM: 3, DM: 1, BMI: 3 },
  { year: 16.25, sex: "M", BP: 3, SM: 3, DM: 1, BMI: 4 },
  { year: 17.17, sex: "M", BP: 4, SM: 1, DM: 1, BMI: 1 },
  { year: 19.78, sex: "M", BP: 4, SM: 1, DM: 1, BMI: 2 },
  { year: 20.56, sex: "M", BP: 4, SM: 1, DM: 1, BMI: 3 },
  { year: 18.92, sex: "M", BP: 4, SM: 1, DM: 1, BMI: 4 },
  { year: 15.73, sex: "M", BP: 4, SM: 2, DM: 1, BMI: 1 },
  { year: 17.96, sex: "M", BP: 4, SM: 2, DM: 1, BMI: 2 },
  { year: 18.76, sex: "M", BP: 4, SM: 2, DM: 1, BMI: 3 },
  { year: 17.53, sex: "M", BP: 4, SM: 2, DM: 1, BMI: 4 },
  { year: 14.05, sex: "M", BP: 4, SM: 3, DM: 1, BMI: 1 },
  { year: 16.12, sex: "M", BP: 4, SM: 3, DM: 1, BMI: 2 },
  { year: 16.95, sex: "M", BP: 4, SM: 3, DM: 1, BMI: 3 },
  { year: 15.42, sex: "M", BP: 4, SM: 3, DM: 1, BMI: 4 },
  { year: 17.56, sex: "M", BP: 1, SM: 1, DM: 2, BMI: 1 },
  { year: 19.63, sex: "M", BP: 1, SM: 1, DM: 2, BMI: 2 },
  { year: 20.8,  sex: "M", BP: 1, SM: 1, DM: 2, BMI: 3 },
  { year: 18.87, sex: "M", BP: 1, SM: 1, DM: 2, BMI: 4 },
  { year: 16.21, sex: "M", BP: 1, SM: 2, DM: 2, BMI: 1 },
  { year: 18.2,  sex: "M", BP: 1, SM: 2, DM: 2, BMI: 2 },
  { year: 19.28, sex: "M", BP: 1, SM: 2, DM: 2, BMI: 3 },
  { year: 17.54, sex: "M", BP: 1, SM: 2, DM: 2, BMI: 4 },
  { year: 14.25, sex: "M", BP: 1, SM: 3, DM: 2, BMI: 1 },
  { year: 16.06, sex: "M", BP: 1, SM: 3, DM: 2, BMI: 2 },
  { year: 17.12, sex: "M", BP: 1, SM: 3, DM: 2, BMI: 3 },
  { year: 15.3,  sex: "M", BP: 1, SM: 3, DM: 2, BMI: 4 },
  { year: 16.81, sex: "M", BP: 2, SM: 1, DM: 2, BMI: 1 },
  { year: 19.13, sex: "M", BP: 2, SM: 1, DM: 2, BMI: 2 },
  { year: 20.14, sex: "M", BP: 2, SM: 1, DM: 2, BMI: 3 },
  { year: 18.03, sex: "M", BP: 2, SM: 1, DM: 2, BMI: 4 },
  { year: 15.51, sex: "M", BP: 2, SM: 2, DM: 2, BMI: 1 },
  { year: 17.56, sex: "M", BP: 2, SM: 2, DM: 2, BMI: 2 },
  { year: 18.56, sex: "M", BP: 2, SM: 2, DM: 2, BMI: 3 },
  { year: 16.74, sex: "M", BP: 2, SM: 2, DM: 2, BMI: 4 },
  { year: 13.57, sex: "M", BP: 2, SM: 3, DM: 2, BMI: 1 },
  { year: 15.47, sex: "M", BP: 2, SM: 3, DM: 2, BMI: 2 },
  { year: 16.44, sex: "M", BP: 2, SM: 3, DM: 2, BMI: 3 },
  { year: 14.55, sex: "M", BP: 2, SM: 3, DM: 2, BMI: 4 },
  { year: 15.63, sex: "M", BP: 3, SM: 1, DM: 2, BMI: 1 },
  { year: 18.18, sex: "M", BP: 3, SM: 1, DM: 2, BMI: 2 },
  { year: 18.98, sex: "M", BP: 3, SM: 1, DM: 2, BMI: 3 },
  { year: 17.01, sex: "M", BP: 3, SM: 1, DM: 2, BMI: 4 },
  { year: 14.33, sex: "M", BP: 3, SM: 2, DM: 2, BMI: 1 },
  { year: 16.48, sex: "M", BP: 3, SM: 2, DM: 2, BMI: 2 },
  { year: 17.29, sex: "M", BP: 3, SM: 2, DM: 2, BMI: 3 },
  { year: 15.74, sex: "M", BP: 3, SM: 2, DM: 2, BMI: 4 },
  { year: 12.59, sex: "M", BP: 3, SM: 3, DM: 2, BMI: 1 },
  { year: 14.58, sex: "M", BP: 3, SM: 3, DM: 2, BMI: 2 },
  { year: 15.41, sex: "M", BP: 3, SM: 3, DM: 2, BMI: 3 },
  { year: 13.68, sex: "M", BP: 3, SM: 3, DM: 2, BMI: 4 },
  { year: 14.82, sex: "M", BP: 4, SM: 1, DM: 2, BMI: 1 },
  { year: 17.27, sex: "M", BP: 4, SM: 1, DM: 2, BMI: 2 },
  { year: 18.05, sex: "M", BP: 4, SM: 1, DM: 2, BMI: 3 },
  { year: 16.16, sex: "M", BP: 4, SM: 1, DM: 2, BMI: 4 },
  { year: 13.57, sex: "M", BP: 4, SM: 2, DM: 2, BMI: 1 },
  { year: 15.63, sex: "M", BP: 4, SM: 2, DM: 2, BMI: 2 },
  { year: 16.43, sex: "M", BP: 4, SM: 2, DM: 2, BMI: 3 },
  { year: 14.93, sex: "M", BP: 4, SM: 2, DM: 2, BMI: 4 },
  { year: 11.88, sex: "M", BP: 4, SM: 3, DM: 2, BMI: 1 },
  { year: 13.79, sex: "M", BP: 4, SM: 3, DM: 2, BMI: 2 },
  { year: 14.6,  sex: "M", BP: 4, SM: 3, DM: 2, BMI: 3 },
  { year: 12.93, sex: "M", BP: 4, SM: 3, DM: 2, BMI: 4 },
  { year: 22.59, sex: "F", BP: 1, SM: 1, DM: 1, BMI: 1 },
  { year: 26.3,  sex: "F", BP: 1, SM: 1, DM: 1, BMI: 2 },
  { year: 26.11, sex: "F", BP: 1, SM: 1, DM: 1, BMI: 3 },
  { year: 27.27, sex: "F", BP: 1, SM: 1, DM: 1, BMI: 4 },
  { year: 18.15, sex: "F", BP: 1, SM: 2, DM: 1, BMI: 1 },
  { year: 21.15, sex: "F", BP: 1, SM: 2, DM: 1, BMI: 2 },
  { year: 21.02, sex: "F", BP: 1, SM: 2, DM: 1, BMI: 3 },
  { year: 21.81, sex: "F", BP: 1, SM: 2, DM: 1, BMI: 4 },
  { year: 18.79, sex: "F", BP: 1, SM: 3, DM: 1, BMI: 1 },
  { year: 22.06, sex: "F", BP: 1, SM: 3, DM: 1, BMI: 2 },
  { year: 22.01, sex: "F", BP: 1, SM: 3, DM: 1, BMI: 3 },
  { year: 23.2,  sex: "F", BP: 1, SM: 3, DM: 1, BMI: 4 },
  { year: 21.12, sex: "F", BP: 2, SM: 1, DM: 1, BMI: 1 },
  { year: 25.16, sex: "F", BP: 2, SM: 1, DM: 1, BMI: 2 },
  { year: 24.87, sex: "F", BP: 2, SM: 1, DM: 1, BMI: 3 },
  { year: 26.28, sex: "F", BP: 2, SM: 1, DM: 1, BMI: 4 },
  { year: 26.89, sex: "F", BP: 2, SM: 2, DM: 1, BMI: 1 },
  { year: 19.82, sex: "F", BP: 2, SM: 2, DM: 1, BMI: 2 },
  { year: 19.64, sex: "F", BP: 2, SM: 2, DM: 1, BMI: 3 },
  { year: 20.34, sex: "F", BP: 2, SM: 2, DM: 1, BMI: 4 },
  { year: 17.62, sex: "F", BP: 2, SM: 3, DM: 1, BMI: 1 },
  { year: 21.27, sex: "F", BP: 2, SM: 3, DM: 1, BMI: 2 },
  { year: 21.18, sex: "F", BP: 2, SM: 3, DM: 1, BMI: 3 },
  { year: 22.53, sex: "F", BP: 2, SM: 3, DM: 1, BMI: 4 },
  { year: 19.98, sex: "F", BP: 3, SM: 1, DM: 1, BMI: 1 },
  { year: 21.65, sex: "F", BP: 3, SM: 1, DM: 1, BMI: 2 },
  { year: 23.35, sex: "F", BP: 3, SM: 1, DM: 1, BMI: 3 },
  { year: 24.49, sex: "F", BP: 3, SM: 1, DM: 1, BMI: 4 },
  { year: 15.89, sex: "F", BP: 3, SM: 2, DM: 1, BMI: 1 },
  { year: 18.75, sex: "F", BP: 3, SM: 2, DM: 1, BMI: 2 },
  { year: 18.56, sex: "F", BP: 3, SM: 2, DM: 1, BMI: 3 },
  { year: 19.22, sex: "F", BP: 3, SM: 2, DM: 1, BMI: 4 },
  { year: 16.63, sex: "F", BP: 3, SM: 3, DM: 1, BMI: 1 },
  { year: 19.98, sex: "F", BP: 3, SM: 3, DM: 1, BMI: 2 },
  { year: 19.87, sex: "F", BP: 3, SM: 3, DM: 1, BMI: 3 },
  { year: 21.09, sex: "F", BP: 3, SM: 3, DM: 1, BMI: 4 },
  { year: 18.93, sex: "F", BP: 4, SM: 1, DM: 1, BMI: 1 },
  { year: 22.44, sex: "F", BP: 4, SM: 1, DM: 1, BMI: 2 },
  { year: 22.14, sex: "F", BP: 4, SM: 1, DM: 1, BMI: 3 },
  { year: 23.17, sex: "F", BP: 4, SM: 1, DM: 1, BMI: 4 },
  { year: 14.98, sex: "F", BP: 4, SM: 2, DM: 1, BMI: 1 },
  { year: 17.76, sex: "F", BP: 4, SM: 2, DM: 1, BMI: 2 },
  { year: 17.56, sex: "F", BP: 4, SM: 2, DM: 1, BMI: 3 },
  { year: 18.18, sex: "F", BP: 4, SM: 2, DM: 1, BMI: 4 },
  { year: 15.73, sex: "F", BP: 4, SM: 3, DM: 1, BMI: 1 },
  { year: 18.95, sex: "F", BP: 4, SM: 3, DM: 1, BMI: 2 },
  { year: 18.83, sex: "F", BP: 4, SM: 3, DM: 1, BMI: 3 },
  { year: 19.98, sex: "F", BP: 4, SM: 3, DM: 1, BMI: 4 },
  { year: 18.31, sex: "F", BP: 1, SM: 1, DM: 2, BMI: 1 },
  { year: 21.65, sex: "F", BP: 1, SM: 1, DM: 2, BMI: 2 },
  { year: 21.47, sex: "F", BP: 1, SM: 1, DM: 2, BMI: 3 },
  { year: 22.54, sex: "F", BP: 1, SM: 1, DM: 2, BMI: 4 },
  { year: 14.35, sex: "F", BP: 1, SM: 2, DM: 2, BMI: 1 },
  { year: 17.03, sex: "F", BP: 1, SM: 2, DM: 2, BMI: 2 },
  { year: 16.92, sex: "F", BP: 1, SM: 2, DM: 2, BMI: 3 },
  { year: 17.62, sex: "F", BP: 1, SM: 2, DM: 2, BMI: 4 },
  { year: 14.91, sex: "F", BP: 1, SM: 3, DM: 2, BMI: 1 },
  { year: 17.95, sex: "F", BP: 1, SM: 3, DM: 2, BMI: 2 },
  { year: 17.91, sex: "F", BP: 1, SM: 3, DM: 2, BMI: 3 },
  { year: 19.05, sex: "F", BP: 1, SM: 3, DM: 2, BMI: 4 },
  { year: 17.01, sex: "F", BP: 2, SM: 1, DM: 2, BMI: 1 },
  { year: 20.82, sex: "F", BP: 2, SM: 1, DM: 2, BMI: 2 },
  { year: 20.56, sex: "F", BP: 2, SM: 1, DM: 2, BMI: 3 },
  { year: 21.91, sex: "F", BP: 2, SM: 1, DM: 2, BMI: 4 },
  { year: 13.24, sex: "F", BP: 2, SM: 2, DM: 2, BMI: 1 },
  { year: 15.85, sex: "F", BP: 2, SM: 2, DM: 2, BMI: 2 },
  { year: 15.7,  sex: "F", BP: 2, SM: 2, DM: 2, BMI: 3 },
  { year: 16.32, sex: "F", BP: 2, SM: 2, DM: 2, BMI: 4 },
  { year: 13.87, sex: "F", BP: 2, SM: 3, DM: 2, BMI: 1 },
  { year: 17.31, sex: "F", BP: 2, SM: 3, DM: 2, BMI: 2 },
  { year: 17.26, sex: "F", BP: 2, SM: 3, DM: 2, BMI: 3 },
  { year: 18.5,  sex: "F", BP: 2, SM: 3, DM: 2, BMI: 4 },
  { year: 16,    sex: "F", BP: 3, SM: 1, DM: 2, BMI: 1 },
  { year: 19.42, sex: "F", BP: 3, SM: 1, DM: 2, BMI: 2 },
  { year: 19.16, sex: "F", BP: 3, SM: 1, DM: 2, BMI: 3 },
  { year: 20.27, sex: "F", BP: 3, SM: 1, DM: 2, BMI: 4 },
  { year: 12.36, sex: "F", BP: 3, SM: 2, DM: 2, BMI: 1 },
  { year: 14.89, sex: "F", BP: 3, SM: 2, DM: 2, BMI: 2 },
  { year: 14.73, sex: "F", BP: 3, SM: 2, DM: 2, BMI: 3 },
  { year: 15.32, sex: "F", BP: 3, SM: 2, DM: 2, BMI: 4 },
  { year: 13,    sex: "F", BP: 3, SM: 3, DM: 2, BMI: 1 },
  { year: 16.13, sex: "F", BP: 3, SM: 3, DM: 2, BMI: 2 },
  { year: 16.05, sex: "F", BP: 3, SM: 3, DM: 2, BMI: 3 },
  { year: 17.21, sex: "F", BP: 3, SM: 3, DM: 2, BMI: 4 },
  { year: 15.07, sex: "F", BP: 4, SM: 1, DM: 2, BMI: 1 },
  { year: 18.34, sex: "F", BP: 4, SM: 1, DM: 2, BMI: 2 },
  { year: 18.07, sex: "F", BP: 4, SM: 1, DM: 2, BMI: 3 },
  { year: 19.08, sex: "F", BP: 4, SM: 1, DM: 2, BMI: 4 },
  { year: 11.57, sex: "F", BP: 4, SM: 2, DM: 2, BMI: 1 },
  { year: 14.01, sex: "F", BP: 4, SM: 2, DM: 2, BMI: 2 },
  { year: 13.85, sex: "F", BP: 4, SM: 2, DM: 2, BMI: 3 },
  { year: 14.4,  sex: "F", BP: 4, SM: 2, DM: 2, BMI: 4 },
  { year: 12.2,  sex: "F", BP: 4, SM: 3, DM: 2, BMI: 1 },
  { year: 15.2,  sex: "F", BP: 4, SM: 3, DM: 2, BMI: 2 },
  { year: 15.1,  sex: "F", BP: 4, SM: 3, DM: 2, BMI: 3 },
  { year: 16.21, sex: "F", BP: 4, SM: 3, DM: 2, BMI: 4 },
];

const BP_MAP: Record<number, string> = { 1: "正常", 2: "正常高値/高値", 3: "Ⅰ度高血圧", 4: "Ⅱ/Ⅲ度高血圧" };
const SM_MAP: Record<number, string> = { 1: "吸わない", 2: "過去に喫煙", 3: "現在喫煙" };
const DM_MAP: Record<number, string> = { 1: "なし", 2: "あり" };
const BMI_MAP: Record<number, string> = { 1: "やせ（<18.5）", 2: "標準（18.5-24.9）", 3: "過体重（25-29.9）", 4: "肥満（30+）" };

function getYear(sex: string, bp: number, sm: number, dm: number, bmi: number): number | null {
  const row = RAW_DATA.find((d) => d.sex === sex && d.BP === bp && d.SM === sm && d.DM === dm && d.BMI === bmi);
  return row ? row.year : null;
}

type SelectProps = { label: string; value: number; onChange: (v: number) => void; options: Record<number, string>; icon: string };

function SelectField({ label, value, onChange, options, icon }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold flex items-center gap-2" style={{ color: TEXT_SECONDARY }}>
        <span>{icon}</span>{label}
      </label>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}` }}>
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k} style={{ background: "#09090b" }}>{v}</option>
        ))}
      </select>
    </div>
  );
}

function ExplanationTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
        <h3 className="text-base font-bold mb-3" style={{ color: TEXT_PRIMARY }}>シミュレーターについて</h3>
        <p className="text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>
          解析ロジックは、NIPPON DATA研究班による長期の追跡調査結果に基づいています。
          以下の4つのリスク因子の組み合わせにより、65歳時点での健康寿命を推計します。
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: "🩸", label: "血圧" },
          { icon: "🚬", label: "喫煙" },
          { icon: "🍬", label: "糖尿病" },
          { icon: "⚖️", label: "BMI" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl p-5 text-center"
            style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}` }}>
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="text-sm font-bold" style={{ color: TEXT_PRIMARY }}>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <p className="text-xs font-semibold" style={{ color: TEXT_SECONDARY }}>
            図1　健康寿命シミュレーターの概念図
          </p>
        </div>
        <div className="p-5">
          <Image src="/simulator-guide.png" alt="健康寿命シミュレーター解説図" width={1200} height={675} className="w-full h-auto rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl p-5" style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}` }}>
        <p className="text-xs leading-relaxed" style={{ color: TEXT_SECONDARY }}>
          <span className="font-bold" style={{ color: ACCENT }}>Source: </span>
          Tsukinoki R, et al. Comprehensive assessment of the impact of blood pressure, body mass index, smoking, and diabetes on healthy life expectancy in Japan: NIPPON DATA90. J Epidemiol. 2025 Jan 11;35(8):349–54.
        </p>
      </div>
    </div>
  );
}

function SimulatorTab() {
  const [sex, setSex] = useState<"M" | "F">("M");
  const [bpB, setBpB] = useState(1); const [smB, setSmB] = useState(1);
  const [dmB, setDmB] = useState(1); const [bmiB, setBmiB] = useState(2);
  const [bpA, setBpA] = useState(1); const [smA, setSmA] = useState(1);
  const [dmA, setDmA] = useState(1); const [bmiA, setBmiA] = useState(2);
  const [result, setResult] = useState<{ yB: number; yA: number } | null>(null);

  const handleCalc = () => {
    const yB = getYear(sex, bpB, smB, dmB, bmiB);
    const yA = getYear(sex, bpA, smA, dmA, bmiA);
    if (yB !== null && yA !== null) setResult({ yB, yA });
  };

  const diff = result ? result.yA - result.yB : 0;
  const chartData = result ? [
    { name: "血圧", 現在: bpB, 目標: bpA },
    { name: "喫煙", 現在: smB, 目標: smA },
    { name: "糖尿病", 現在: dmB, 目標: dmA },
    { name: "BMI", 現在: bmiB, 目標: bmiA },
  ] : [];

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>
        生活習慣の改善による健康寿命の延伸効果を可視化します。65歳時点で何年の延伸が期待できるかを示しています。
      </p>

      <div className="rounded-2xl p-5" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
        <p className="text-xs font-semibold mb-4" style={{ color: TEXT_MUTED }}>性別</p>
        <div className="flex gap-3">
          {(["M", "F"] as const).map((s) => (
            <button key={s} onClick={() => { setSex(s); setResult(null); }}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
              style={sex === s
                ? { background: ACCENT, color: "white" }
                : { background: "rgba(255,255,255,0.05)", color: TEXT_SECONDARY, border: `1px solid ${BORDER}` }}>
              {s === "M" ? "👨 男性" : "👩 女性"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 space-y-4" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
          <p className="text-sm font-bold pb-3" style={{ color: TEXT_SECONDARY, borderBottom: `1px solid ${BORDER}` }}>📋 現在</p>
          <SelectField label="血圧" value={bpB} onChange={(v) => { setBpB(v); setResult(null); }} options={BP_MAP} icon="🩸" />
          <SelectField label="喫煙" value={smB} onChange={(v) => { setSmB(v); setResult(null); }} options={SM_MAP} icon="🚬" />
          <SelectField label="糖尿病" value={dmB} onChange={(v) => { setDmB(v); setResult(null); }} options={DM_MAP} icon="🍬" />
          <SelectField label="BMI" value={bmiB} onChange={(v) => { setBmiB(v); setResult(null); }} options={BMI_MAP} icon="⚖️" />
        </div>
        <div className="rounded-2xl p-5 space-y-4" style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}` }}>
          <p className="text-sm font-bold pb-3" style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT_BORDER}` }}>✨ 目標</p>
          <SelectField label="血圧" value={bpA} onChange={(v) => { setBpA(v); setResult(null); }} options={BP_MAP} icon="🩸" />
          <SelectField label="喫煙" value={smA} onChange={(v) => { setSmA(v); setResult(null); }} options={SM_MAP} icon="🚬" />
          <SelectField label="糖尿病" value={dmA} onChange={(v) => { setDmA(v); setResult(null); }} options={DM_MAP} icon="🍬" />
          <SelectField label="BMI" value={bmiA} onChange={(v) => { setBmiA(v); setResult(null); }} options={BMI_MAP} icon="⚖️" />
        </div>
      </div>

      <button onClick={handleCalc}
        className="w-full py-4 rounded-2xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.99]"
        style={{ background: ACCENT }}>
        🚀 結果を表示する
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-6 text-center" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-xs font-semibold mb-3" style={{ color: TEXT_MUTED }}>現状の予測健康寿命</p>
              <p className="text-4xl font-bold" style={{ color: TEXT_PRIMARY }}>{result.yB.toFixed(2)}<span className="text-base font-normal ml-1" style={{ color: TEXT_MUTED }}>年</span></p>
            </div>
            <div className="rounded-2xl p-6 text-center"
              style={{ background: diff > 0 ? ACCENT_LIGHT : BG_CARD, border: `1px solid ${diff > 0 ? ACCENT_BORDER : BORDER}` }}>
              <p className="text-xs font-semibold mb-3" style={{ color: TEXT_MUTED }}>目標達成時の予測寿命</p>
              <p className="text-4xl font-bold" style={{ color: TEXT_PRIMARY }}>{result.yA.toFixed(2)}<span className="text-base font-normal ml-1" style={{ color: TEXT_MUTED }}>年</span></p>
              <p className="text-base font-bold mt-2" style={{ color: diff > 0 ? ACCENT : diff < 0 ? "#ef4444" : TEXT_MUTED }}>
                {diff > 0 ? `+${diff.toFixed(2)} 年` : diff < 0 ? `${diff.toFixed(2)} 年` : "変化なし"}
              </p>
            </div>
          </div>

          {diff > 0 && (
            <div className="rounded-2xl p-5 text-sm font-medium" style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
              💡 改善により健康寿命が <strong>{diff.toFixed(2)}年</strong> 延びる可能性があります。
            </div>
          )}

          <div className="rounded-2xl p-5" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
            <p className="text-xs font-semibold mb-4" style={{ color: TEXT_MUTED }}>リスクレベル比較（低いほど低リスク）</p>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: TEXT_SECONDARY }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12, fill: TEXT_SECONDARY }} />
                <Tooltip contentStyle={{ background: "#0f0f12", border: `1px solid ${BORDER}`, borderRadius: "12px", color: "white" }} />
                <Legend wrapperStyle={{ fontSize: "13px", color: TEXT_SECONDARY }} />
                <Bar dataKey="現在" fill="rgba(148,163,184,0.5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="目標" fill={ACCENT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>
            ※本データの出典　Tsukinoki R, et al. Comprehensive assessment of the impact of blood pressure, body mass index, smoking, and diabetes on healthy life expectancy in Japan: NIPPON DATA90. J Epidemiol. 2025 Jan 11;35(8):349–54
          </p>
        </div>
      )}
    </div>
  );
}

export function HealthSimulator() {
  const [activeTab, setActiveTab] = useState<"explanation" | "simulator">("explanation");

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex gap-2 p-2 rounded-2xl" style={{ background: BG_CARD, border: `1px solid ${BORDER}` }}>
          <button onClick={() => setActiveTab("explanation")}
            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
            style={activeTab === "explanation"
              ? { background: ACCENT, color: "white" }
              : { color: TEXT_SECONDARY }}>
            📖 説明
          </button>
          <button onClick={() => setActiveTab("simulator")}
            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
            style={activeTab === "simulator"
              ? { background: ACCENT, color: "white" }
              : { color: TEXT_SECONDARY }}>
            🚀 シミュレーター
          </button>
        </div>

        {activeTab === "explanation" ? <ExplanationTab /> : <SimulatorTab />}
      </div>
    </div>
  );
}
