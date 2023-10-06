import Layout from "@/components/Layout";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Golf",
  description: "Mimolette and Crevette Claude's Golf App",
};

export default function RootLayout({children}: React.PropsWithChildren) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Theme>
      <Layout>
        {children}
      </Layout>
    </Theme>
    </body>
    </html>
  );
}
