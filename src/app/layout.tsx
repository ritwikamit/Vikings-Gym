import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Vikings Gym — Unleash The Warrior Within | Premium Fitness Center Aurangabad",
  description:
    "Vikings Gym is a premium fitness center in Aurangabad, Bihar. We offer state-of-the-art equipment, certified trainers, personalized workout & diet plans. Join now and transform your body!",
  keywords: [
    "gym",
    "fitness",
    "Vikings Gym",
    "Aurangabad gym",
    "Bihar gym",
    "personal training",
    "workout",
    "bodybuilding",
    "weight loss",
    "strength training",
  ],
  authors: [{ name: "Vikings Gym" }],
  openGraph: {
    title: "Vikings Gym — Unleash The Warrior Within",
    description: "Premium fitness center in Aurangabad, Bihar. Transform your body, conquer your limits.",
    url: "https://vikingsgym.in",
    siteName: "Vikings Gym",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1A1A1A",
              color: "#FFFFFF",
              border: "1px solid #333333",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: { primary: "#22C55E", secondary: "#FFFFFF" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FFFFFF" },
            },
          }}
        />
      </body>
    </html>
  );
}
