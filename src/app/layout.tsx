import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter, Sora } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const sora = Sora({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: "Vikings Gym | Premium Fitness Club",
  description: "Train like a warrior. Transform your body at Vikings Gym — Aurangabad's premier fitness destination with world-class equipment, certified trainers, and a warrior community.",
  keywords: [
    "gym", "fitness", "Vikings Gym", "Aurangabad gym", "Bihar gym", "personal training",
    "workout", "bodybuilding", "weight loss", "strength training", "premium fitness club",
    "CrossFit", "HIIT", "yoga", "Nordic fitness",
  ],
  authors: [{ name: "Vikings Gym" }],
  openGraph: {
    title: "Vikings Gym | Premium Fitness Club",
    description: "Train like a warrior. Transform your body at Vikings Gym — Aurangabad's premier fitness destination.",
    url: "https://vikingsgym.in",
    siteName: "Vikings Gym",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "Vikings Gym" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikings Gym | Premium Fitness Club",
    description: "Train like a warrior. Transform your body at Vikings Gym.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://vikingsgym.in"),
};

import Providers from "@/components/Providers";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", inter.variable, sora.variable)} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(0,0,0,0.85)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
              backdropFilter: "blur(12px)",
            },
            success: { iconTheme: { primary: "#22C55E", secondary: "#FFFFFF" } },
            error: { iconTheme: { primary: "#C62828", secondary: "#FFFFFF" } },
          }}
        />
      </body>
    </html>
  );
}
