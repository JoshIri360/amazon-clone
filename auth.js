import GithubProvider from "next-auth/providers/github";
import GoogleAuthProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";

const githubClientId = process.env.GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET;
const googleClientId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_SECRET;

if (
  !githubClientId ||
  !githubClientSecret ||
  !googleClientId ||
  !googleClientSecret
) {
  throw new Error("OAuth environment variables are not set.");
}

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    GoogleAuthProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
};

// Use it in server contexts
export function auth(...args) {
  return getServerSession(...args, config);
}
