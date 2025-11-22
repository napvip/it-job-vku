"use client";

import { useRouter, useParams } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { JobDetailPage as JobDetailComponent } from "../../components/job-detail/JobDetailPage";

export default function JobDetail() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id ? parseInt(params.id as string) : null;

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

  return (
    <>
      <Header
        currentPage="jobs"
        onNavigate={handleNavigate}
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToPage={handleNavigateToPage}
      />
      <JobDetailComponent jobId={jobId} />
      <Footer onNavigateToPage={handleNavigateToPage} />
    </>
  );
}
