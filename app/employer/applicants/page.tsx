"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { EmployerApplicantsPage as EmployerApplicantsComponent } from "../../components/employer/EmployerApplicantsPage";

export default function EmployerApplicants() {
  return (
    <>
      <EmployerHeader />
      <EmployerApplicantsComponent jobId={null} />
    </>
  );
}
