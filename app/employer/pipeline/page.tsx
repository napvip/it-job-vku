"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { PipelinePage as PipelineComponent } from "../../components/employer/PipelinePage";

export default function Pipeline() {
  return (
    <>
      <EmployerHeader />
      <PipelineComponent />
    </>
  );
}
