/** Tableau Public の /views/{workbook}/{sheet} 用パス */
export type TableauViz = {
  id: string;
  label: string;
  /**
   * 同じメニュー内の複数シート（左から順に「次のページ」で表示）。
   * 2枚目以降は実際のTableauシート名に差し替えてください。
   */
  viewPaths: string[];
};

export function toTableauEmbedUrl(viewPath: string): string {
  const trimmed = viewPath.replace(/^\/+/, "").replace(/\/+$/, "");
  return `https://public.tableau.com/views/${trimmed}?:embed=y&:showVizHome=no&:language=ja-JP&:toolbar=yes`;
}

/**
 * プライマリURLを基準に、count枚分のプレースホルダー配列を作る。
 * 2枚目以降は同じURLになっているので、実際のシートパスに差し替えてください。
 */
function placeholder(primaryPath: string, count: number): string[] {
  return Array.from({ length: count }, () => primaryPath);
}

export const TABLEAU_VIZZES: TableauViz[] = [
  {
    id: "t0",
    label: "1　はじめに",
    viewPaths: [
      "_17699983935030/1_2",
    ],
  },
  {
    id: "t1",
    label: "2　令和６年版健康づくり支援資料集",
    viewPaths: [
      "_17712276428270/sheet2",
      "_17712268986930/sheet5",
      "_17709702137690/3",
      "_17709690232020/sheet2",
      "_17709671379270/sheet2",
      "_17709654415840/sheet2",
      "30__17709632627960/sheet2",
      "_17688870371690/1_1",
      "304_17684604718550/1",
      "_17678631930780/1",
      "_17678582740430/1",
      "5_17667137548220/1",
    ],
  },
  {
    id: "t2",
    label: "3　健診結果等データ分析結果報告書",
    viewPaths: [
      "LDL140mg/1",
      "_17690720694320/1",
      "126mgdL/1",
      "HbA1c6_5/1",
      "130mmHg/1",
      "BMI25kgm2/1",
      "__17688063836080/sheet2",
      "__17687920988570/30",
      "__17687917013360/30",
      "__17687887751760/1",
    ],
  },
  {
    id: "t3",
    label: "4　市町診断",
    viewPaths: [
      "_17688993869340/1",
    ],
  },
  {
    id: "t4",
    label: "5　県内市町の死亡数および死亡比の推移",
    viewPaths: [
      "__17713726859600/sheet4",
    ],
  },
  {
    id: "t5",
    label: "6　市町別データ",
    viewPaths: [
      "20182023_17726395117230/20182023",
      "Wellbeing_17726019986350/sheet4",
      "_17725986138580/_",
      "_17725912169380/sheet4",
    ],
  },
  {
    id: "t6",
    label: "7　都道府県別データ",
    viewPaths: [
      "_17726253623710/19862023_2",
      "_17726119631140/sheet2",
      "_17726057588570/CNDcs",
      "20102020_17726019075660/20102020",
      "19652020_17720842482320/sheet2",
      "2020_17684409005100/2020",
    ],
  },
  {
    id: "t7",
    label: "8　国民健康保険の特定健診特定保健指導",
    viewPaths: [
      "H30-R5_17732130862660/1_1",
      "H30-R5/1_1",
    ],
  },
];