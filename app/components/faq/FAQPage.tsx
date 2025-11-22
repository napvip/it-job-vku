"use client";

import { FAQHero } from "./FAQHero";
import { FAQSearch } from "./FAQSearch";
import { FAQAccordion } from "./FAQAccordion";

export function FAQPage() {
  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      <FAQHero />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FAQSearch />
            <FAQAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}

