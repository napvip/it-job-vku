"use client";

import { BlogHero } from "./BlogHero";
import { BlogList } from "./BlogList";
import { BlogSidebar } from "./BlogSidebar";

export function BlogPage() {
  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      <BlogHero />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2">
                <BlogList />
              </div>

              {/* Sidebar - 1 column */}
              <div>
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

