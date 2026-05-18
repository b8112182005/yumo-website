import dynamic from "next/dynamic";
import InfoBar from "@/components/InfoBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Brands from "@/components/Brands";
import StatsBand from "@/components/StatsBand";
import Products from "@/components/Products";
import ShowroomTour from "@/components/ShowroomTour";
import ColorWall from "@/components/ColorWall";
import Engineering from "@/components/Engineering";
import Portfolio from "@/components/Portfolio";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
      <Brands />
      <StatsBand />
      <Products />
      <ShowroomTour />
      <ColorWall />
      <ARWallPainter />
      <Engineering />
      <Portfolio />
      <CtaBand />
      <Contact />
      <Footer />
    </>
  );
}
