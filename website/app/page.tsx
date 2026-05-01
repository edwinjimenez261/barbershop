import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { Barbers } from "@/components/Barbers";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Barbers />
        <Gallery />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
