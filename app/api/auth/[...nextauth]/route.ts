import NextAuth from "next-auth";
import { config } from "@/auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  ...config,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
