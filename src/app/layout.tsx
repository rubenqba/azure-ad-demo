import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@component/Navbar";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "@component/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Next.js + Azure AD Authentication',
  description: 'App demonstrating Azure AD auth with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Navbar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
