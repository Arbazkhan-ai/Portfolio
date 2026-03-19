import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CyberCursor from "@/components/ui/CyberCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arbaz Khan | AI Engineer & Developer",
  description: "Portfolio of Arbaz Khan — AI Engineer specializing in Machine Learning, Deep Learning, NLP, and Computer Vision. Building intelligent systems that solve real problems.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Arbaz Khan"],
  openGraph: {
    title: "Arbaz Khan | AI Engineer & Developer",
    description: "AI Engineer specializing in Machine Learning, Deep Learning, NLP, and Computer Vision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <CyberCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
