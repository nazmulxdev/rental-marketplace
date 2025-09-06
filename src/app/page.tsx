import Image from "next/image";
import ThemeToggleButton from "../components/ThemeToggleButton";
import Footer from "../components/shared/Footer";
import Banner from "../components/home/Banner";
import FeaturedProperties from "../components/home/FeaturedProperties";
import HowItWorks from "../components/home/HowItWorks";
import WhyChoose from "../components/home/WhyChoose";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";
import AboutSection from "../components/home/AboutSection";
export default async function Home() {
  return (
    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20">
    <div className="">
<Banner></Banner>
<FeaturedProperties></FeaturedProperties>
<HowItWorks></HowItWorks>
<WhyChoose></WhyChoose>
<AboutSection></AboutSection>
<Testimonials></Testimonials>
<CTASection></CTASection>
<Footer></Footer>
    </div>
  );
}
