"use client";

import { Suspense } from "react";
import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { MessagesPage as MessagesComponent } from "../../components/candidate/MessagesPageNew";

function MessagesPageContent() {
  return (
    <>
      <CandidateHeader />
      <MessagesComponent />
    </>
  );
}

export default function CandidateMessages() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#ECF4D6] pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải...</p>
        </div>
      </div>
    }>
      <MessagesPageContent />
    </Suspense>
  );
}
