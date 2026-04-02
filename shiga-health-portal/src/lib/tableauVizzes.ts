/** Tableau Public の /views/{workbook}/{sheet} 用パス（プロフィールの viz URL から変換） */
export type TableauViz = {
  id: string;
  label: string;
  /**
   * 同じメニュー内の複数シート・ビュー（左から順に「次のページ」で表示）。
   * プレースホルダーで枚数だけ確保し、不要な末尾は削るか、別シートのパスに差し替えてください。
   */
  viewPaths: string[];
};

/**
 * 1本のパスから「次のページ」用に N 枚分の配列を作る（初期は同一URL）。
 * 2ページ目以降を Tableau の共有URLから得た別シートのパスに置き換えてください。
 */
export const TABLEAU_PLACEHOLDER_PAGE_COUNT = 12;

export function expandViewPlaceholders(
  primaryPath: string,
  count = TABLEAU_PLACEHOLDER_PAGE_COUNT
): string[] {
  return Array.from({ length: count }, () => primaryPath);
}

export function toTableauEmbedUrl(viewPath: string): string {
  const trimmed = viewPath.replace(/^\/+/, "").replace(/\/+$/, "");
  return `https://public.tableau.com/views/${trimmed}?:embed=y&:showVizHome=no&:language=ja-JP&:toolbar=yes`;
}

export const TABLEAU_VIZZES: TableauViz[] = [
  {
    id: "t0",
    label: "1　はじめに",
    viewPaths: expandViewPlaceholders("_17699983935030/1_2"),
  },
  {
    id: "t1",
    label: "2　令和６年版健康づくり支援資料集",
    viewPaths: expandViewPlaceholders("_17712276428270/sheet2"),
  },
  {
    id: "t2",
    label:
      "3　健診結果等データ分析結果報告書 40から74歳の該当比 令和4年度健診等データ分析結果報告書",
    viewPaths: expandViewPlaceholders("LDL140mg/1"),
  },
  {
    id: "t3",
    label: "4　市町診断",
    viewPaths: expandViewPlaceholders("_17688993869340/1"),
  },
  {
    id: "t4",
    label: "5　県内市町の死亡数および死亡比の推移 人口動態統計特殊",
    viewPaths: expandViewPlaceholders("__17713726859600/sheet4"),
  },
  {
    id: "t5",
    label: "6　市町別データ",
    viewPaths: expandViewPlaceholders("20182023_17726395117230/20182023"),
  },
  {
    id: "t6",
    label: "7　都道府県別データ",
    viewPaths: expandViewPlaceholders("_17726253623710/19862023_2"),
  },
  {
    id: "t7",
    label: "8　国民健康保険の特定健診特定保健指導",
    viewPaths: expandViewPlaceholders("H30-R5_17732130862660/1_1"),
  },
];
