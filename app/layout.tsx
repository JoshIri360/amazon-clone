import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

const montserrat = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon",
  description:
    "Browse & discover millions of products. Read customer reviews and find best sellers.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
