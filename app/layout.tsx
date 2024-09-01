import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLogo from "@/components/NavLogo";
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fash-care",
  description: "fash-care, A complete Medical Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/logo-BG.png" sizes="any" />
      </Head>
      <body className={inter.className}>
        <NavLogo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
