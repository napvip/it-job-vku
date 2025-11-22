"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { InterviewsPage as InterviewsComponent } from "../../components/candidate/InterviewsPage";

export default function CandidateInterviews() {
  return (
    <>
      <CandidateHeader />
      <InterviewsComponent />
    </>
  );
}
