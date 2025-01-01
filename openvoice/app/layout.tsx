import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | OpenVoice",
    default: "OpenVoice",
  },
  description: "Giving voice for the people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
