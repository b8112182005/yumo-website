import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-serif",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "瑀墨塗料 YUMO PAINT — 專業塗料選品與工程施作",
  description:
    "瑀墨塗料精選全球頂級品牌塗料，從居家空間到商業工程，提供最專業的塗料選品與施工服務。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${notoSerifTC.variable} ${notoSansTC.variable} font-sans bg-brand-white text-brand-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
