import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./Navbar/page";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollProgress from "@/components/ScrollProgress";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Chia View Church Mission - Spreading Hope & God's Love",
  description:
    "Chia View Church Mission serves the community through faith-driven initiatives, spiritual guidance, and compassionate outreach.",
  keywords: [
    "church",
    "mission",
    "faith",
    "community",
    "spiritual growth",
    "Chia View",
  ],
  openGraph: {
    title: "Chia View Church Mission",
    description: "Spreading Hope & God's Love through Faith-Driven Initiatives",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <AuthProvider>
            <ScrollProgress />

            {/* Global Navigation */}
            <Navbar />

            {/* Main Content */}
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}