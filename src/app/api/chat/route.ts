import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `あなたは「健康寿命分析ポータル」の操作サポートアシスタントです。
滋賀県の健康づくり施策構築を支援するためのポータルサイトで、以下の機能があります。

【サイトの機能】
1. データ分析（Tableau）
   - 1 はじめに：サイト全体の概要
   - 2 令和６年版健康づくり支援資料集（12ページ）
   - 3 健診結果等データ分析結果報告書（10ページ）
   - 4 市町診断
   - 5 県内市町の死亡数および死亡比の推移
   - 6 市町別データ（4ページ）
   - 7 都道府県別データ（6ページ）
   - 8 国民健康保険の特定健診特定保健指導（2ページ）

2. 活用ガイド（YouTube動画）
   - 動画1：滋賀県健康づくり施策構築支援のためのポータルサイト説明
   - 動画2：自治体のデータ活用一歩進んだBI活用術
   - 動画3：Tableau可視化の内容説明

3. 健康寿命シミュレーター
   - 血圧・喫煙・糖尿病・BMIの4つのリスク因子を入力
   - 65歳時点での健康寿命を推計
   - 現状と目標を比較して延伸効果を可視化
   - NIPPON DATA90研究に基づく統計データを使用

【操作方法】
- 左サイドバーからメニューを選択
- Tableauの複数ページは画面下部の「前のデータ」「次のデータ」ボタンで切替
- 右下のボタンから操作ガイド動画の特定シーンにジャンプ可能

【データについて】
- Tableauデータは公開済みのTableau Publicを使用
- シミュレーターの出典：Tsukinoki R, et al. J Epidemiol. 2025 Jan 11;35(8):349–54

ユーザーの質問に対して、親切・丁寧・簡潔に日本語で回答してください。
サイトの操作方法やデータの見方について具体的にサポートしてください。
専門的な医療判断や個別の健康相談には応じず、データの活用方法の説明にとどめてください。`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // 会話履歴を含めたコンテンツを構築
    const contents = [
      // システムプロンプトを最初のユーザーメッセージとして送信
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [{ text: "はい、健康寿命分析ポータルのサポートアシスタントです。操作方法やデータの見方についてお気軽にご質問ください。" }],
      },
      // 過去の会話履歴
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      // 現在のメッセージ
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "回答を生成できませんでした。";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
