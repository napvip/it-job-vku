"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { DashboardPage as DashboardComponent } from "../../components/candidate/DashboardPage";

export default function CandidateDashboard() {
  return (
    <>
      <CandidateHeader />
      <DashboardComponent />
    </>
  );
}
