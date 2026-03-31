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

export default function Home() {
  return (
    <>
      <InfoBar />
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <Engineering />
      <Portfolio />
      <CtaBand />
      <Contact />
      <Footer />
    </>
  );
}
