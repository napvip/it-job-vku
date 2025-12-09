"use client";

import { useParams } from "next/navigation";
import { EmployerHeader } from "../../../components/employer/EmployerHeader";
import { JobDetailPage } from "../../../components/employer/JobDetailPage";

export default function EmployerJobDetail() {
  const params = useParams();
  const jobId = params.id as string;

  return (
    <>
      <EmployerHeader />
      <JobDetailPage jobId={jobId} />
    </>
  );
}
