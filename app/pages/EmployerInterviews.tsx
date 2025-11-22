import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, List, Plus, Filter } from 'lucide-react';
import CalendarView from '../components/interviews/CalendarView';
import ListView from '../components/interviews/ListView';
import InterviewFilterBar from '../components/interviews/InterviewFilterBar';
import CreateInterviewModal from '../components/interviews/CreateInterviewModal';
import InterviewDetailModal from '../components/interviews/InterviewDetailModal';
import StatsSidebar from '../components/interviews/StatsSidebar';

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  jobTitle: string;
  jobId: string;
  matchScore: number;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'online' | 'onsite';
  location?: string;
  meetingLink?: string;
  interviewer: string;
  interviewerRole: string;
  candidateNotes: string;
  internalNotes: string;
  status: 'sent' | 'confirmed' | 'completed' | 'cancelled' | 'pending';
}

export interface FilterOptions {
  status: string[];
  jobId: string | null;
  type: string | null;
  dateRange: { start: string | null; end: string | null };
}

const EmployerInterviews: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    jobId: null,
    type: null,
    dateRange: { start: null, end: null },
  });

  const handleInterviewClick = (interviewId: string) => {
    setSelectedInterviewId(interviewId);
  };

  const handleCloseDetailModal = () => {
    setSelectedInterviewId(null);
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-[#265073] mb-2">Lịch phỏng vấn</h1>
              <p className="text-[#265073]/70">
                Quản lý toàn bộ các buổi phỏng vấn giữa công ty và ứng viên.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilterBar(!showFilterBar)}
                className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                  showFilterBar
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-white text-[#265073] border-2 border-[#9AD0C2] hover:bg-[#9AD0C2]/20'
                }`}
              >
                <Filter className="w-5 h-5" />
                Lọc phỏng vấn
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Tạo lịch phỏng vấn
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        {showFilterBar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <InterviewFilterBar filters={filters} setFilters={setFilters} />
          </motion.div>
        )}

        {/* View Mode Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="inline-flex bg-white rounded-full p-1.5 border-2 border-[#9AD0C2]">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#2D9596] text-white'
                  : 'text-[#265073] hover:bg-[#9AD0C2]/20'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all ${
                viewMode === 'list'
                  ? 'bg-[#2D9596] text-white'
                  : 'text-[#265073] hover:bg-[#9AD0C2]/20'
              }`}
            >
              <List className="w-5 h-5" />
              List
            </button>
          </div>
        </motion.div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-6">
          {/* View Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {viewMode === 'calendar' ? (
              <CalendarView filters={filters} onInterviewClick={handleInterviewClick} />
            ) : (
              <ListView filters={filters} onInterviewClick={handleInterviewClick} />
            )}
          </motion.div>

          {/* Sidebar - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-[320px] hidden lg:block"
          >
            <StatsSidebar />
          </motion.div>
        </div>
      </div>

      {/* Create Interview Modal */}
      {showCreateModal && (
        <CreateInterviewModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Interview Detail Modal */}
      {selectedInterviewId && (
        <InterviewDetailModal
          interviewId={selectedInterviewId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default EmployerInterviews;
