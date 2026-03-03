import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { createMetadata } from "@/lib/metadata";

// Display font - Editorial luxury titles and headings
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Serif font - Elegant body text and descriptions
const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Sans font - Clean modern UI elements
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="Organization" data={{}} />
        <StructuredData type="LocalBusiness" data={{}} />
        <StructuredData type="WebSite" data={{}} />
      </head>
      <body
        className={`${playfairDisplay.variable} ${crimsonPro.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
