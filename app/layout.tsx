import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Nav2 from "@/components/Nav2";
import Provider from "@/components/Provider";

import { getServerSession } from "next-auth";

const montserrat = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon",
  description:
    "Browse & discover millions of products. Read customer reviews and find best sellers.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`h-screen bg-blue-50 ${montserrat.className}`}>
        <Provider session={session}>
          <main className="app">
            <Nav />
            <Nav2 />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
