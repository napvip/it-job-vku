"use client";

import { useRouter, useParams } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CompanyDetailPage as CompanyDetailComponent } from "../../components/company-detail/CompanyDetailPage";

export default function CompanyDetail() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.id ? parseInt(params.id as string) : null;

  const handleNavigate = (page: "home" | "jobs" | "companies") => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  const handleNavigateToPage = (page: string) => {
    router.push(`/${page}`);
  };

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  const handleNavigateToRegister = () => {
    router.push("/register");
  };

  const handleJobClick = (jobId: number) => {
    router.push(`/job/${jobId}`);
  };

  const handleCompanyClick = (companyId: number) => {
    router.push(`/company/${companyId}`);
  };

  return (
    <>
      <Header
        currentPage="company-detail"
        onNavigate={handleNavigate}
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToPage={handleNavigateToPage}
      />
      <CompanyDetailComponent 
        companyId={companyId} 
        onJobClick={handleJobClick}
        onCompanyClick={handleCompanyClick}
      />
      <Footer onNavigateToPage={handleNavigateToPage} />
    </>
  );
}
