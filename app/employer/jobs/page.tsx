"use client";

import { useRouter } from "next/navigation";
import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { EmployerJobsPage as EmployerJobsComponent } from "../../components/employer/EmployerJobsPage";

export default function EmployerJobs() {
  const router = useRouter();

  const handleJobClick = (jobId: number) => {
    router.push(`/employer/job/${jobId}`);
  };

  return (
    <>
      <EmployerHeader />
      <EmployerJobsComponent onJobClick={handleJobClick} />
    </>
  );
}
