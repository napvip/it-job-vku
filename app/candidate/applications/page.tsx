"use client";

import { useRouter } from "next/navigation";
import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { ApplicationsPage as ApplicationsComponent } from "../../components/candidate/ApplicationsPage";

export default function CandidateApplications() {
  const router = useRouter();

  const handleApplicationClick = (applicationId: number) => {
    router.push(`/candidate/application/${applicationId}`);
  };

  return (
    <>
      <CandidateHeader />
      <ApplicationsComponent onApplicationClick={handleApplicationClick} />
    </>
  );
}
