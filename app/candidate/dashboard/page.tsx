"use client";

import { useRouter } from "next/navigation";
import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { DashboardPage as DashboardComponent } from "../../components/candidate/DashboardPage";

export default function CandidateDashboard() {
  const router = useRouter();

  const handleNavigateToProfile = () => {
    router.push("/candidate/profile");
  };

  const handleApplicationClick = (applicationId: number) => {
    router.push(`/candidate/application/${applicationId}`);
  };

  return (
    <>
      <CandidateHeader />
      <DashboardComponent 
        onNavigateToProfile={handleNavigateToProfile}
        onApplicationClick={handleApplicationClick}
      />
    </>
  );
}
