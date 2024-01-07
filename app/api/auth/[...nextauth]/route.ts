import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

type NextAuthOptions = Parameters<typeof NextAuth>[0];

const clientId = process.env.AUTH_GOOGLE_ID;
const clientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Google OAuth environment variables are not set.");
}

console.log(
  `Google OAuth environment variables are set, they are ${clientId} and ${clientSecret}`
);

const handler = NextAuth({
  providers: [
    Google({
      clientId,
      clientSecret,
    }),
  ],
  debug: true,
}) as NextAuthOptions;

export { handler as GET, handler as POST };
