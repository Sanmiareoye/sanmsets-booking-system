import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocalizationProviderwrapper from "../../components/LocalizationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sanmsets",
  description: "Generated by Sanmi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LocalizationProviderwrapper>
      <body className={inter.className}>{children}</body>
      </LocalizationProviderwrapper>
    </html>
  );
}
