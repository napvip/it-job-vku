"use client";

import { useState } from "react";
import { CandidateHeader } from "@/app/components/candidate/CandidateHeader";
import { AIInterviewSetup, SetupConfig } from "@/app/components/candidate/AIInterviewSetup";
import { AIInterviewPage } from "@/app/components/candidate/AIInterviewPageNew";

export default function AIInterview() {
  const [config, setConfig] = useState<SetupConfig | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = (setupConfig: SetupConfig) => {
    setConfig(setupConfig);
    setIsStarted(true);
  };

  const handleExit = () => {
    setIsStarted(false);
    setConfig(null);
  };

  return (
    <>
      {!isStarted && <CandidateHeader />}
      {!isStarted ? (
        <AIInterviewSetup onStart={handleStart} />
      ) : (
        <AIInterviewPage config={config!} onExit={handleExit} />
      )}
    </>
  );
}
