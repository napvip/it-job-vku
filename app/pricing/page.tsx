import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PricingPage as PricingComponent } from "../components/pricing/PricingPage";

export default function Pricing() {
  return (
    <>
      <Header />
      <PricingComponent />
      <Footer />
    </>
  );
}
