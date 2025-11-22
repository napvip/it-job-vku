"use client";

import { motion } from "framer-motion";
import { WelcomeSection } from "./dashboard/WelcomeSection";
import { QuickOverview } from "./dashboard/QuickOverview";
import { AIJobRecommendations } from "./dashboard/AIJobRecommendations";
import { ProfileCompletion } from "./dashboard/ProfileCompletion";
import { RecentApplications } from "./dashboard/RecentApplications";
import { UpcomingInterviews } from "./dashboard/UpcomingInterviews";
import { FollowingCompanies } from "./dashboard/FollowingCompanies";
import { LatestMessages } from "./dashboard/LatestMessages";
import { NotificationsCard } from "./dashboard/NotificationsCard";
import { LearningSuggestions } from "./dashboard/LearningSuggestions";

interface DashboardPageProps {
  onNavigateToProfile?: () => void;
  onApplicationClick?: (applicationId: number) => void;
}

export function DashboardPage({ onNavigateToProfile, onApplicationClick }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Overview Stats */}
        <QuickOverview />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            <AIJobRecommendations />
            <RecentApplications onApplicationClick={onApplicationClick} />
            <UpcomingInterviews />
          </div>

          {/* Sidebar Column - 1/3 */}
          <div className="space-y-6">
            <FollowingCompanies />
            <LatestMessages />
            <NotificationsCard />
            <LearningSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
}

