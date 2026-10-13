import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebsDesignUSA - Custom Web Design & Development",
  description: "We create new technologies for your business thanks to our wonderful team of professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-emerald-500 selection:text-white">
        {/* 2. Yahan Navbar lagayein taake har page par show ho */}
        <Navbar />
        
        {/* Main page content */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}