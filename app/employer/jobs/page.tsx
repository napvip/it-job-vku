"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { EmployerJobsPage as EmployerJobsComponent } from "../../components/employer/EmployerJobsPage";

export default function EmployerJobs() {
  return (
    <>
      <EmployerHeader />
      <EmployerJobsComponent />
    </>
  );
}
