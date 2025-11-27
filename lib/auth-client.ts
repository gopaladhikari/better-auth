import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

if (!baseURL) throw new Error("Base url is required");

export const authClient = createAuthClient({
  baseURL,
  plugins: [usernameClient()],
});
