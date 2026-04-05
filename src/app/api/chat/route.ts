import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

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

ユーザーの質問に対して、親切・丁寧・簡潔に日本語で回答してください。
回答はポータルの操作方法やデータの見方・活用方法に関する質問のみ行ってください。
ポータルに存在しないデータや機能については「このポータルにはそのデータは含まれておりません」と明確に答えてください。
医療判断・個別の健康相談・食事や生活習慣の具体的なアドバイスなど、ポータルの操作・データ活用と無関係な質問には回答しないでください。
そのような質問には「このポータルでは医療・健康相談には対応しておりません。かかりつけ医や専門家にご相談ください。」とのみ回答してください。
回答は簡潔に2〜3文以内にまとめてください。長い回答は避けてください。`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "回答を生成できませんでした。";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}