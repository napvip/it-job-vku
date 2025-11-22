"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { SavedJobsPage as SavedJobsComponent } from "../../components/candidate/SavedJobsPage";

export default function CandidateSavedJobs() {
  return (
    <>
      <CandidateHeader />
      <SavedJobsComponent />
    </>
  );
}
