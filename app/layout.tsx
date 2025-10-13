import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nothing But The Fruit | Gospel Podcast with Pastor Demetria Bass",
  description: "Join Pastor Demetria Bass for powerful biblical teaching and spiritual growth. From the battlefield to the pulpit, experience pure gospel truth that transforms lives. Nothing but the fruit of God's Word.",
  keywords: "gospel podcast, christian podcast, Pastor Demetria Bass, Bass Global Ministries, biblical teaching, spiritual growth, faith podcast, christian ministry, BGM, fruit of the spirit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        <main className="pt-[90px]">{children}</main>
        <Footer />
        <ScrollAnimations />
      </body>
    </html>
  );
}
