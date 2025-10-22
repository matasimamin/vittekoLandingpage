import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vitteko – Digitala kvitton via NFC",
  description:
    "Digitala kvitton som bara funkar: inget papper, inga appar, inga problem. NFC, API och full kompatibilitet.",
  metadataBase: new URL("https://dindomän.se"),
  openGraph: {
    title: "Vitteko – Digitala kvitton via NFC",
    description:
      "Miljövänliga digitala kvitton – universellt och bara ett tap bort.",
    url: "https://dindomän.se",
    siteName: "Vitteko",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "sv_SE",
    type: "website",
  },
  alternates: { canonical: "https://dindomän.se" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
