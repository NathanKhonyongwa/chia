/**
 * RootLayout - Main application layout wrapper
 * Features:
 * - Global font configuration (Geist Sans & Mono)
 * - Global stylesheet
 * - Navigation shell
 * - SEO metadata
 * - Accessibility configuration
 */

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarShell from "./NavbarShell";
import { AuthProvider } from "@/context/AuthContext";

// Configure Geist font family as primary sans-serif
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono for code/monospace text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * SEO metadata for the application
 * Used by search engines and social media platforms
 */
export const metadata = {
  title: "Chia View Church Mission - Spreading Hope & God's Love",
  description:
    "Chia View Church Mission serves the community through faith-driven initiatives, spiritual guidance, and compassionate outreach. Join us in spreading hope and transforming lives.",
  keywords: ["church", "mission", "faith", "community", "spiritual growth", "Chia View"],
  openGraph: {
    title: "Chia View Church Mission",
    description: "Spreading Hope & God's Love through Faith-Driven Initiatives",
    url: "https://chiamissionview.org",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chia View Church Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chia View Church Mission",
    description: "Spreading Hope & God's Love",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <NavbarShell>{children}</NavbarShell>
        </AuthProvider>
      </body>
    </html>
  );
}
