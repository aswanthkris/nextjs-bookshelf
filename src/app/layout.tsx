"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import { ToastProvider } from "components/ToastProvider/ToastProvider";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Bookshelf-book sharing",
//   description: "Build a bookshelf, build a community.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionProvider>
    <html lang="en">
      <ToastProvider>
        <body className={inter.className}>
          <div style={{ marginBottom: "75px" }}></div>
          <Header />
          {children}
        </body>
      </ToastProvider>
    </html>
    // </SessionProvider>
  );
}
