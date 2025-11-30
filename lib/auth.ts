import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) throw new Error("Please provide mongodb url");

const client = new MongoClient(`${mongodbUri}/better-auth`);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [username(), nextCookies()],
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10, // 10 minutes
    },
  },
});

export type Session = typeof auth.$Infer.Session;
