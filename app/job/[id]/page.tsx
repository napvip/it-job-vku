"use client";

import { useParams } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { JobDetailPagePublic } from "../../components/jobs/JobDetailPagePublic";

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id as string;

  return (
    <>
      <Header />
      <JobDetailPagePublic jobId={jobId} />
      <Footer />
    </>
  );
}
