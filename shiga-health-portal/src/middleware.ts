import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  // テスト用：ID: admin / PW: password
  if (authHeader !== "Basic " + btoa("shiga:shiga123")) {
    return new NextResponse("Authentication Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// ここが重要：すべてのページで動くように設定
export const config = {
  matcher: "/:path*",
};