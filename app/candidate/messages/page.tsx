"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { MessagesPage as MessagesComponent } from "../../components/candidate/MessagesPage";

export default function CandidateMessages() {
  return (
    <>
      <CandidateHeader />
      <MessagesComponent />
    </>
  );
}
