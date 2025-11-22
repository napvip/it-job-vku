import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AIMatchingPage as AIMatchingComponent } from "../components/ai-matching/AIMatchingPage";

export default function AIMatching() {
  return (
    <>
      <Header />
      <AIMatchingComponent />
      <Footer />
    </>
  );
}
