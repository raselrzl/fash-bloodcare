import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import NavLogo from "./components/NavLogo";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MBPI",
  description: "MBPI, Blood donation Community",
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
