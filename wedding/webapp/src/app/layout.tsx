import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Mimolette and Crevette",
  description: "Wedding photos and videos",
};

export default function RootLayout({children}: React.PropsWithChildren) {
  return (
    <html lang="en">
    <body className={inter.className}>
    {children}
    </body>
    </html>
  );
}