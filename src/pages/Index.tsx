import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Plus, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/notices/SearchBar';
import CategoryFilter from '@/components/notices/CategoryFilter';
import NoticeList from '@/components/notices/NoticeList';
import UrgentBanner from '@/components/notices/UrgentBanner';
import BottomNav from '@/components/navigation/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">CampusNotice</h1>
              <p className="text-xs text-muted-foreground">
                {user?.department || 'University'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emergency text-[10px] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 py-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Urgent Banner */}
          <UrgentBanner />

          {/* Search */}
          <SearchBar />

          {/* Category Filter */}
          <CategoryFilter />

          {/* Notice List */}
          <NoticeList />
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Floating Action Button */}
      {user && (user.role === 'faculty' || user.role === 'admin') && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="fixed bottom-20 right-6 z-40"
        >
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
