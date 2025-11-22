"use client";

import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      <ContactHero />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form - 2 columns */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Info - 1 column */}
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

