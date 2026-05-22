import ExtraSection from "@/components/Extra";
import HeroBanner from "@/components/HeroSection";
import TopRatedDoctors from "@/components/Top";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <TopRatedDoctors />
      <ExtraSection />
    </div>
  );
};

export default HomePage;
