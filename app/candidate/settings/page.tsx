"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { SettingsPage as SettingsComponent } from "../../components/candidate/SettingsPage";

export default function CandidateSettings() {
  return (
    <>
      <CandidateHeader />
      <SettingsComponent />
    </>
  );
}
