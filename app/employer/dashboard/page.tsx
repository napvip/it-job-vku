"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { EmployerDashboardPage as EmployerDashboardComponent } from "../../components/employer/EmployerDashboardPage";

export default function EmployerDashboard() {
  return (
    <>
      <EmployerHeader />
      <EmployerDashboardComponent />
    </>
  );
}
