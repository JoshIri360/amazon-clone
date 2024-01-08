import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleAuthProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
