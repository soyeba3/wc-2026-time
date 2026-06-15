import HeroSection from "@/components/HeroSection";
import UpcomingSection from "@/components/UpcomingSection";
import GroupsSection from "@/components/GroupsSection";
import ScheduleSection from "@/components/ScheduleSection";
import KnockoutSection from "@/components/KnockoutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <UpcomingSection />
      <GroupsSection />
      <ScheduleSection />
      <KnockoutSection />
      <Footer />
    </main>
  );
}
