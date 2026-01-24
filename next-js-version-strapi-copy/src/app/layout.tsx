import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "./navigation";
import { fetchAPI } from "../lib/strapi";

const calSans = localFont({
  src: "./fonts/CalSans.woff2",
  variable: "--font-title",
  weight: "600",
  display: "swap",
});
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "MakeMeBeautiful",
  description: "A blog about inner beauty",
};

// Manrope for body copy (sans-serif)
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], 
});

// DM Mono for monospace usage
const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const socialData = await fetchAPI("/social-link");
  const socialLinks = socialData?.data?.attributes || {};

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${dmMono.variable} ${calSans.variable} layout-body-container antialiased`} suppressHydrationWarning>
        <Navigation />
        {children}
        <Footer socialLinks={socialLinks} />
      </body>
    </html>
  );
}
