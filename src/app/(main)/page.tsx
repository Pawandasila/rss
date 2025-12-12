import Header from "@/components/common/Navbar/Navbar";
import Hero from "./_components/Hero";
import ServicesSection from "./_components/Service";
import Blog from "./_components/blogs";
import DivineMission from "./_components/DivineMission";
import PressSection from "./_components/Press";
import Testimonials from "./_components/testimonials";
import Supporters from "./_components/Supporters";

export default function Home() {
  return (
    <main
      className="min-h-screen w-full max-w-[100vw] bg-white text-gray-800 font-sans selection:bg-orange-100 selection:text-primary"
      role="main"
    >
      <Header />
      <Hero />
      <Supporters />
      <ServicesSection />
      <DivineMission />
      <Blog />
      <PressSection />
      <Testimonials />
    </main>
  );
}
