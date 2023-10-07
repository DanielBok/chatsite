import MainLayout from "@/components/MainLayout";
import { APP_NAME } from "@/constants";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Monkey Chat and Beaver Chat's Golf App",
};


export default function RootLayout({children}: React.PropsWithChildren) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <StyledComponentsRegistry>
      <MainLayout>
        {children}
      </MainLayout>
    </StyledComponentsRegistry>
    </body>
    </html>
  );
}
