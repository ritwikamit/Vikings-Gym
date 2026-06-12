import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter, Sora } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const sora = Sora({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: "Vikings Gym | Premium Fitness Club",
  description: "Train like a warrior at Vikings Gym — Aurangabad's premier fitness destination.",
  openGraph: { title: "Vikings Gym | Premium Fitness Club", description: "Train like a warrior.", url: "https://vikingsgym.in", siteName: "Vikings Gym", type: "website", locale: "en_IN", images: [{ url: "/logo.png", width: 800, height: 800 }] },
  icons: { icon: [{ url: "/favicon.png" }], apple: "/apple-touch-icon.png" },
  metadataBase: new URL("https://vikingsgym.in"),
};

import Providers from "@/components/Providers";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", inter.variable, sora.variable)} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomCursor />
        <Providers>{children}</Providers>
        <Toaster position="top-right" toastOptions={{
          duration: 4000,
          style: { background: "rgba(0,0,0,0.9)", color: "#fff", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", fontSize: "0.875rem", backdropFilter: "blur(12px)" },
          success: { iconTheme: { primary: "#22C55E", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }} />
      </body>
    </html>
  );
}
