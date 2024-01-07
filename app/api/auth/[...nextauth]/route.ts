import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

type NextAuthOptions = Parameters<typeof NextAuth>[0];

const clientId = process.env.AUTH_GOOGLE_ID;
const clientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Google OAuth environment variables are not set.");
}

const handler = NextAuth({
  providers: [
    Google({
      clientId,
      clientSecret,
    }),
  ],
  async session({ session }: any) {},
  async signIn({ profile }: any) {},
}) as NextAuthOptions;

export { handler as GET, handler as POST };
