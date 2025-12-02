import { CandidateHeader } from "@/app/components/candidate/CandidateHeader";
import { SubmitCVWithAIPage } from "@/app/components/candidate/SubmitCVWithAIPage";
import { Toaster } from "sonner";

export default function SubmitCVWithAI() {
  return (
    <>
      <CandidateHeader />
      <SubmitCVWithAIPage />
      <Toaster position="top-right" richColors />
    </>
  );
}
