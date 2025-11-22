"use client";

import { AIMatchingHero } from "./AIMatchingHero";
import { AIForCandidates } from "./AIForCandidates";
import { AIForEmployers } from "./AIForEmployers";
import { AIHowItWorks } from "./AIHowItWorks";
import { AIDemo } from "./AIDemo";
import { AIBenefits } from "./AIBenefits";
import { AIStats } from "./AIStats";
import { AICTA } from "./AICTA";

export function AIMatchingPage() {
  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      <AIMatchingHero />
      <AIForCandidates />
      <AIForEmployers />
      <AIHowItWorks />
      <AIDemo />
      <AIBenefits />
      <AIStats />
      <AICTA />
    </div>
  );
}

