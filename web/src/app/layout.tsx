import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/wallet";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geo-Token Protocol",
  description:
    "Mobile-first Geo-Token Protocol on Celo: buy Geo-Land with cUSD/cEUR, earn AGT, redeem to cUSD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1 container mx-auto px-4 py-6 max-w-screen-sm">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
