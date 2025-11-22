"use client";

import { AboutHero } from "./AboutHero";
import { AboutMission } from "./AboutMission";
import { AboutHowItWorks } from "./AboutHowItWorks";
import { AboutBenefits } from "./AboutBenefits";
import { AboutTechnology } from "./AboutTechnology";
import { AboutCTA } from "./AboutCTA";

interface AboutPageProps {
  onNavigateToRegister?: () => void;
}

export function AboutPage({ onNavigateToRegister }: AboutPageProps = {}) {
  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      <AboutHero />
      <AboutMission />
      <AboutHowItWorks />
      <AboutBenefits />
      <AboutTechnology />
      <AboutCTA onNavigateToRegister={onNavigateToRegister} />
    </div>
  );
}

