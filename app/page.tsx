import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { SearchBar } from "./components/SearchBar";
import { Features } from "./components/Features";
import { AIMatching } from "./components/AIMatching";
import { ForCandidate } from "./components/ForCandidate";
import { ForEmployer } from "./components/ForEmployer";
import { FeaturedJobs } from "./components/FeaturedJobs";
import { TopCompanies } from "./components/TopCompanies";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <SearchBar />
        <Features />
        <AIMatching />
        <ForCandidate />
        <ForEmployer />
        <FeaturedJobs />
        <TopCompanies />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
