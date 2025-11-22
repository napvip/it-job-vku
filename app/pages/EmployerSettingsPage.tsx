import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import SettingsSidebar from '../components/employer/settings/SettingsSidebar';
import ProfileSettings from '../components/employer/settings/ProfileSettings';
import AccountSettings from '../components/employer/settings/AccountSettings';
import SecuritySettings from '../components/employer/settings/SecuritySettings';
import NotificationSettings from '../components/employer/settings/NotificationSettings';
import PrivacySettings from '../components/employer/settings/PrivacySettings';
import PaymentSummary from '../components/employer/settings/PaymentSummary';
import TeamSummary from '../components/employer/settings/TeamSummary';

interface EmployerSettingsPageProps {
  onNavigateToPackages: () => void;
  onNavigateToTeam: () => void;
  onLogout: () => void;
}

type ToastType = 'success' | 'error';

const EmployerSettingsPage: React.FC<EmployerSettingsPageProps> = ({
  onNavigateToPackages,
  onNavigateToTeam,
  onLogout,
}) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  const handleSave = () => {
    setToast({
      type: 'success',
      message: '✔ Cập nhật thành công!',
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleError = () => {
    setToast({
      type: 'error',
      message: '⚠ Vui lòng kiểm tra thông tin bắt buộc.',
    });
    setTimeout(() => setToast(null), 3000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings onSave={handleSave} />;
      case 'account':
        return <AccountSettings onSave={handleSave} />;
      case 'security':
        return <SecuritySettings onSave={handleSave} />;
      case 'notifications':
        return <NotificationSettings onSave={handleSave} />;
      case 'privacy':
        return <PrivacySettings onSave={handleSave} />;
      case 'payment':
        return <PaymentSummary onNavigateToPackages={onNavigateToPackages} />;
      case 'team':
        return <TeamSummary onNavigateToTeam={onNavigateToTeam} />;
      default:
        return <ProfileSettings onSave={handleSave} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="flex">
        {/* Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-8 z-50"
          >
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
                toast.type === 'success'
                  ? 'bg-[#2D9596] text-white'
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p>{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployerSettingsPage;
