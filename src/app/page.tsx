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

const ProductViewer3D = dynamic(
  () => import("@/components/ProductViewer3D"),
  { ssr: false, loading: () => <div style={{ height: 400, background: "#0D0D0D" }} /> }
);

const ARWallPainter = dynamic(
  () => import("@/components/ARWallPainter"),
  { ssr: false }
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
