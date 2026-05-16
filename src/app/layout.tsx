import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

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

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export const metadata: Metadata = {
  title: "瑀墨塗料 YUMO PAINT — 嚴選全球品牌 · 專業塗料代理",
  description:
    "瑀墨塗料嚴選代理立邦、得利、班傑明摩爾等六大國際品牌，提供工程商、設計師最完善的塗料採購方案。台中倉儲，全台配送。",
  keywords: ["塗料", "油漆", "代理", "立邦", "得利", "班傑明摩爾", "台中", "瑀墨"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${notoSerifTC.variable} ${notoSansTC.variable} font-sans bg-brand-ink text-brand-ink antialiased`}
      >
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
