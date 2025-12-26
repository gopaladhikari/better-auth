import {
  NextRequest,
  NextResponse,
  type ProxyConfig,
} from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard"];

const authRoutes = [
  "/login",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
];

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const url = request.nextUrl.pathname;

  console.log("nextUrl", request.nextUrl);

  if (session && authRoutes.includes(url))
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (!session && protectedRoutes.includes(url))
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/login",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/dashboard",
  ],
};
