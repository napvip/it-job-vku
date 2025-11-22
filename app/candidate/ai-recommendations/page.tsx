"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { AIRecommendationsPage as AIRecommendationsComponent } from "../../components/candidate/AIRecommendationsPage";

export default function CandidateAIRecommendations() {
  return (
    <>
      <CandidateHeader />
      <AIRecommendationsComponent />
    </>
  );
}
