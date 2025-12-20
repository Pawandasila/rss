"use client";
import Hero from "./_components/Hero";
import ServicesSection from "./_components/Service";
import Blog from "./_components/blogs";
import DivineMission from "./_components/DivineMission";
import PressSection from "./_components/Press";
import Testimonials from "./_components/testimonials";
import Supporters from "./_components/Supporters";
import DonationList from "./_components/DonationList";
import AboutSection from "./_components/About";
import ShikayatSection from "./_components/Shikayat";
import StickySidebar from "@/components/common/sticky-sidebar";
import VyapariSection from "./_components/Vyapari";
import GallerySection from "./_components/GallerySection";

export default function Home() {
  return (
    <main
      className="min-h-screen w-full max-w-[100vw] bg-white text-gray-800 font-sans selection:bg-orange-100 selection:text-primary"
      role="main"
    >
      <Hero />
      <Supporters />
      <AboutSection />
      <ServicesSection />
      <DivineMission />
      <DonationList />
      <ShikayatSection />
      <VyapariSection />
      <Blog />
      <GallerySection />
      <PressSection />
      <Testimonials />
      <StickySidebar />
    </main>
  );
}
