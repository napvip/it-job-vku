"use client";

import { useParams } from "next/navigation";
import { EmployerHeader } from "../../../../components/employer/EmployerHeader";
import { EditJobPage } from "../../../../components/employer/EditJobPage";

export default function EditJob() {
  const params = useParams();
  const jobId = params.id as string;

  return (
    <>
      <EmployerHeader />
      <EditJobPage jobId={jobId} />
    </>
  );
}
