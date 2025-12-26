import arcjet, {
  protectSignup,
  detectBot,
  tokenBucket,
  shield,
  slidingWindow,
} from "@arcjet/next";
import { findIp } from "@arcjet/ip";
import { auth } from "@/lib/auth";

const signUpProtection = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },

      bots: {
        mode: "LIVE",
        allow: [],
      },

      rateLimit: {
        mode: "LIVE",
        interval: "1m",
        max: 5,
      },
    }),
  ],
});

const protection = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [],
    }),

    tokenBucket({
      mode: "LIVE",
      characteristics: ["userIdOrIp"],
      refillRate: 20,
      interval: 5,
      capacity: 20,
    }),

    shield({
      mode: "LIVE",
    }),

    slidingWindow({
      mode: "LIVE",
      interval: 60,
      max: 100,
    }),
  ],
});

export async function arcjetProtection(req: Request) {
  const body = await req.json();

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const userIdOrIp = session?.user.id ?? (findIp(req) || "127.0.0.1");

  // req.url = /api/auth/sign-up/email

  console.log(req.url);

  if (
    req.url.endsWith("/auth/sign-up/email") &&
    body &&
    typeof body === "object" &&
    "email" in body
  ) {
    const decision = await signUpProtection.protect(req, {
      email: body.email,
    });

    return decision;
  }

  const decision = await protection.protect(req, {
    requested: 5,
    userIdOrIp,
  });

  return decision;
}
