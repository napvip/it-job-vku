"use client";

import { EmployerHeader } from "../../components/employer/EmployerHeader";
import { CompanyProfilePage as CompanyProfileComponent } from "../../components/employer/CompanyProfilePage";

export default function CompanyProfile() {
  return (
    <>
      <EmployerHeader />
      <CompanyProfileComponent />
    </>
  );
}
