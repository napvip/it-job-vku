"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { CreateJobPage as CreateJobComponent } from "../../components/employer/CreateJobPage";

export default function CreateJob() {
  return (
    <>
      <EmployerHeader />
      <CreateJobComponent />
    </>
  );
}
