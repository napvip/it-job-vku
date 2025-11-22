"use client";

import { PricingHero } from "./PricingHero";
import { PricingCards } from "./PricingCards";
import { PricingFAQ } from "./PricingFAQ";
import { PricingCTA } from "./PricingCTA";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      <PricingHero />
      <PricingCards />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
}

