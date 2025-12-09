"use client";

import { useParams } from "next/navigation";
import { EmployerHeader } from "../../../components/employer/EmployerHeader";
import { JobApplicantsPage } from "../../../components/employer/JobApplicantsPage";

export default function JobApplicants() {
  const params = useParams();
  const jobId = params.jobId as string;

  return (
    <>
      <EmployerHeader />
      <JobApplicantsPage jobId={jobId} />
    </>
  );
}
