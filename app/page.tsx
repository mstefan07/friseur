import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { BookingForm } from "@/components/BookingForm";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PriceList } from "@/components/PriceList";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PriceList />
        <BeforeAfterGallery />
        <Gallery />
        <BookingForm />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
