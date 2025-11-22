"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { FollowingCompaniesPage as FollowingCompaniesComponent } from "../../components/candidate/FollowingCompaniesPage";

export default function CandidateFollowingCompanies() {
  return (
    <>
      <CandidateHeader />
      <FollowingCompaniesComponent />
    </>
  );
}
