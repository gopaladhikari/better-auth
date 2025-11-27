import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) throw new Error("Please provide mongodb url");

const client = new MongoClient(mongodbUri);
const db = client.db();

export const auth = betterAuth({
  appName: "better-auth",
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
