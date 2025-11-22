"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { ProfilePage as ProfileComponent } from "../../components/candidate/ProfilePage";

export default function CandidateProfile() {
  return (
    <>
      <CandidateHeader />
      <ProfileComponent />
    </>
  );
}
