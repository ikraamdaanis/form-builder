/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    CLERK_SECRET_KEY: string;
    CLIENT_PORT: string;
    DATABASE_URL: string;
    GITHUB_AUTH_TOKEN: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    NEXT_PUBLIC_VERCEL_URL: string;
    NODE_ENV: "development" | "production";
    PORT: string;
    PWD: string;
  }
}
