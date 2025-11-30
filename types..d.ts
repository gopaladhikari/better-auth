declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      BETTER_AUTH_URL: string;
      BETTER_AUTH_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      ARCJET_KEY: string;
    }
  }

  interface Params<T = string> {
    params: Promise<Record<T, string>>;
    searchParams: Promise<Record<T, string>>;
  }
}

export {};
