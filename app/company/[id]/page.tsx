"use client";

import { useParams } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CompanyDetailPage as CompanyDetailComponent } from "../../components/company-detail/CompanyDetailPage";

export default function CompanyDetail() {
  const params = useParams();
  const companyId = params.id as string;

  return (
    <>
      <Header />
      <CompanyDetailComponent companyId={companyId} />
      <Footer />
    </>
  );
}
