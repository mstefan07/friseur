import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { BookingForm } from "@/components/BookingForm";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { OwnerSection } from "@/components/OwnerSection";
import { PriceList } from "@/components/PriceList";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OwnerSection />
        <Services />
        <BeforeAfterGallery />
        <PriceList />
        <Gallery />
        <BookingForm />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
