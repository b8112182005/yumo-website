import dynamic from "next/dynamic";
import InfoBar from "@/components/InfoBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import Engineering from "@/components/Engineering";
import Portfolio from "@/components/Portfolio";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ARWallPainter = dynamic(
  () => import("@/components/ARWallPainter"),
  { ssr: false }
);

const ProductViewer3D = dynamic(
  () => import("@/components/ProductViewer3D"),
  {
    ssr: false,
    loading: () => (
      <section className="bg-[#0D0D0D] py-24 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#C6A45C] text-3xl font-bold italic font-serif">02</div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wider mt-2 text-[#E8E3DA]">
            360° 產品展示
          </h2>
          <div className="h-[320px] md:h-[420px] mt-8 border border-[#C6A45C]/10 flex items-center justify-center">
            <div className="text-[#B5AFA3] text-sm tracking-widest animate-pulse">
              載入 3D 模型中...
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

export default function Home() {
  return (
    <>
      <InfoBar />
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <ProductViewer3D />
      <ARWallPainter />
      <Engineering />
      <Portfolio />
      <CtaBand />
      <Contact />
      <Footer />
    </>
  );
}
