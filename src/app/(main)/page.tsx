import dynamic from "next/dynamic";
import Hero from "./_components/Hero";

const ServicesSection = dynamic(() => import("./_components/Service"));
const Blog = dynamic(() => import("./_components/blogs"));
const DivineMission = dynamic(() => import("./_components/DivineMission"));
const PressSection = dynamic(() => import("./_components/Press"));
const Testimonials = dynamic(() => import("./_components/testimonials"));
const Supporters = dynamic(() => import("./_components/Supporters"));
const DonationList = dynamic(() => import("./_components/DonationList"));
const AboutSection = dynamic(() => import("./_components/About"));
const ShikayatSection = dynamic(() => import("./_components/Shikayat"));
const StickySidebar = dynamic(
  () => import("@/components/common/sticky-sidebar")
);
const VyapariSection = dynamic(() => import("./_components/Vyapari"));
const GallerySection = dynamic(() => import("./_components/GallerySection"));
const Team = dynamic(() => import("./_components/Team"));
const BirthdaySection = dynamic(() => import("./_components/Birthday"));

export default function Home() {
  return (
    <main
      className="min-h-screen w-full max-w-[100vw] bg-white text-gray-800 font-sans selection:bg-orange-100 selection:text-primary"
      role="main"
    >
      <Hero />
      <Supporters />
      <AboutSection />
      <DivineMission />
      <Team />
      <ShikayatSection />
      <VyapariSection />
      <ServicesSection />
      <BirthdaySection />
      <DonationList />
      <Blog />
      <GallerySection />
      <PressSection />
      <Testimonials />
      <StickySidebar />
    </main>
  );
}
