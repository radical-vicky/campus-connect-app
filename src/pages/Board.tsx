import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/notices/SearchBar';
import CategoryFilter from '@/components/notices/CategoryFilter';
import NoticeList from '@/components/notices/NoticeList';
import NoticeCard from '@/components/notices/NoticeCard';
import BottomNav from '@/components/navigation/BottomNav';
import { useNotices } from '@/contexts/NoticesContext';
import { useNavigate } from 'react-router-dom';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const { filteredNotices } = useNotices();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Notice Board</h1>
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon-sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon-sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
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
          {/* Search */}
          <SearchBar />

          {/* Category Filter */}
          <CategoryFilter />

          {/* Notice Grid/List */}
          {viewMode === 'list' ? (
            <NoticeList />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredNotices.map((notice, index) => (
                <NoticeCard key={notice.id} notice={notice} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Board;
