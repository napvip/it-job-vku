"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { ApplicationsPage as ApplicationsComponent } from "../../components/candidate/ApplicationsPage";

export default function CandidateApplications() {
  return (
    <>
      <CandidateHeader />
      <ApplicationsComponent />
    </>
  );
}
