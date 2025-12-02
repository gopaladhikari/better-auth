import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { arcjetProtection } from "./arcjet-protection";
import { NextResponse } from "next/server";

const routeHandler = toNextJsHandler(auth.handler);

export const { GET } = routeHandler;

export async function POST(req: Request) {
  const reqClone = req.clone();

  const decision = await arcjetProtection(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit())
      return NextResponse.json(
        {
          message: "Too many attemps",
        },
        {
          status: 429,
        }
      );

    if (decision.reason.isEmail()) {
      const type = decision.reason.emailTypes[0];

      const messageMaps: Record<string, string> = {
        DISPOSABLE: "Disposable email addresses are not allowed.",
        INVALID: "Email address is invalid.",
        NO_MX_RECORDS: "Email domain is not valid.",
      };

      const message = messageMaps[type] || "Invalid email";

      return NextResponse.json({ message }, { status: 400 });
    }

    if (decision.reason.isBot())
      return NextResponse.json(null, { status: 403 });

    return NextResponse.json(
      {
        message: decision.reason || "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }

  return routeHandler.POST(reqClone);
}
