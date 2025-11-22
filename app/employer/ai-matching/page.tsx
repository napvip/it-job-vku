"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { AICandidateMatchingPage as AICandidateMatchingComponent } from "../../components/employer/AICandidateMatchingPage";

export default function EmployerAIMatching() {
  return (
    <>
      <EmployerHeader />
      <AICandidateMatchingComponent />
    </>
  );
}
