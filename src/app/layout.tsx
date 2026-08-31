import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DocsLayout } from "@/components/docs/docs-layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer UI — Components for developer interfaces",
  description:
    "A collection of reusable shadcn/ui components for debugging, inspecting, and visualizing developer data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <DocsLayout>{children}</DocsLayout>
      </body>
    </html>
  );
}
