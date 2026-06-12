import type { Metadata } from "next";
import { Anton, Fredoka, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhanyatha Corry — Portfolio",
  description:
    "35+ projects spanning AI Research, Computer Vision, Data Science, Full Stack Web, AI Security, Quantum Computing, and AI Agents. Explore the skill-map portfolio of Dhanyatha Corry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${fredoka.variable} ${inter.variable} h-full`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
