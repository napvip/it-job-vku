"use client";

import { useParams } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { JobDetailPage as JobDetailComponent } from "../../components/job-detail/JobDetailPage";

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id ? parseInt(params.id as string) : null;

  return (
    <>
      <Header />
      <JobDetailComponent jobId={jobId} />
      <Footer />
    </>
  );
}
