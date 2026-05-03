import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Working from "../components/Working";
import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <>
      {/* Top section */}
      <div className="relative">
        <HeroSection />
        <Features />
      </div>

      {/* Other sections */}
      <Working />
      <Testimonials />
    </>
  );
};

export default HomePage;