import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeMation",
  description: "Your favorite anime, all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-7xl mx-auto bg-[#0F1117]">
          <Hero />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
