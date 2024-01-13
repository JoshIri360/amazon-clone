import { config } from "@/auth";
import NextAuth from "next-auth";

export const handler = NextAuth(config);

export { handler as GET, handler as POST };
