"use client";

import { useRouter } from "next/navigation";
import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { EmployerApplicantsPage as EmployerApplicantsComponent } from "../../components/employer/EmployerApplicantsPage";

export default function EmployerApplicants() {
  const router = useRouter();

  const handleApplicantClick = (applicantId: number) => {
    router.push(`/employer/applicant/${applicantId}`);
  };

  return (
    <>
      <EmployerHeader />
      <EmployerApplicantsComponent onApplicantClick={handleApplicantClick} />
    </>
  );
}
