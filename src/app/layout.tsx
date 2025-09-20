// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocalizationProviderwrapper from "../../components/LocalizationProvider";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";
import AuthProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanmsets",
  description:
    "Book your nail appointments easily with Sanmsets, a handcrafted booking system for your nails.",
  icons: {
    icon: "/favicon.ico", // important!
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <LocalizationProviderwrapper>{children}</LocalizationProviderwrapper>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
