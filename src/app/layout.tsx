import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CyberCursor from "@/components/ui/CyberCursor"; // Import Cursor
import ScrollProgress from "@/components/ui/ScrollProgress";
import StarField from "@/components/scene/StarField";
import CRTOverlay from "@/components/ui/CRTOverlay";
import Spotlight from "@/components/ui/Spotlight";
import BackgroundText from "@/components/ui/BackgroundText";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arbaz Khan | AI Engineer & Innovator",
  description: "Portfolio of Arbaz Khan, an AI Engineer specializing in Machine Learning, NLP, and Computer Vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased has-starfield`}
      >
        <div className="grid-bg" />
        <div className="noise-overlay" />
        <Spotlight />
        <BackgroundText />
        <CRTOverlay />
        <StarField />
        <CyberCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
