// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/ui/aurora-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soshiza",
  description: "Soshiza agencia de publicidad digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuroraBackground>
          {children}
        </AuroraBackground>
      </body>
    </html>
  );
}
