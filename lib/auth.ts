import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { SignupEmailVerification } from "@/emails/signup-email-verfication";
import { ResetPasswordEmail } from "@/emails/reset-password-email";
import { WelcomeEmail } from "@/emails/welcome-email";

const mongodbUri = process.env.MONGODB_URI;

const resendApiKey = process.env.RESEND_API_KEY;

if (!mongodbUri) throw new Error("Please provide mongodb url");

const resend = new Resend(resendApiKey);

const client = new MongoClient(`${mongodbUri}/better-auth`);
const db = client.db();

export const auth = betterAuth({
  appName: "better-auth",
  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [username(), nextCookies()],
  user: {
    additionalFields: {
      address: {
        type: "string",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    // Forgot password and reset password
    async sendResetPassword({ url, user }) {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your password",
        react: ResetPasswordEmail({ name: user.name, url }),
      });
    },
  },
  // Verifying the email after signup
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,

    async sendVerificationEmail({ url, user }) {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: SignupEmailVerification({ name: user.name, url }),
      });
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      mapProfileToUser() {
        return {
          address: "Google Earth",
        };
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10, // 10 minutes
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      console.log("paths", ctx.path);
      if (ctx.path.startsWith("/verify-email")) {
        const session = ctx.context.newSession?.user;

        if (session) {
          void resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [session.email],
            subject: "Welcome to Better auth",
            react: WelcomeEmail({
              name: session.name,
            }),
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
