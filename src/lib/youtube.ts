/**
 * 解説動画の YouTube URL（単体動画・プレイリスト・watch / youtu.be / embed いずれでも可）
 * ここに貼り付けるか、プロジェクト直下の .env.local に
 * NEXT_PUBLIC_YOUTUBE_VIDEO_URL=... を書いてください（.env.local が優先されます）。
 */
const FALLBACK_YOUTUBE_VIDEO_URL =
  "https://www.youtube.com/playlist?list=PLYDRweCy1uxeG5oJqZEvrjFIt5OGLsjNc";

export function getConfiguredYouTubeUrl(): string {
  const fromEnv =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_URL?.trim()
      : undefined;
  if (fromEnv) return fromEnv;
  return FALLBACK_YOUTUBE_VIDEO_URL.trim();
}

/** watch / youtu.be / shorts / embed 形式を埋め込み用 URL に変換 */
export function toYouTubeEmbedUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  try {
    const u = new URL(raw);

    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        return u.toString();
      }
      const listId = u.searchParams.get("list");
      if (
        listId &&
        (u.pathname === "/playlist" || u.pathname.startsWith("/playlist/"))
      ) {
        return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(listId)}`;
      }
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/").filter(Boolean)[1];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
  } catch {
    return null;
  }

  return null;
}
