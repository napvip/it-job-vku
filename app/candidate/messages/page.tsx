"use client";

import { CandidateHeader } from "../../components/candidate/CandidateHeader";
import { MessagesPage as MessagesComponent } from "../../components/candidate/MessagesPageNew";

export default function CandidateMessages() {
  return (
    <>
      <CandidateHeader />
      <MessagesComponent />
    </>
  );
}
