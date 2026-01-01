import React from 'react';
import NoticeCard from './NoticeCard';
import { useNotices } from '@/contexts/NoticesContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FileX, Loader2 } from 'lucide-react';

const NoticeList: React.FC = () => {
  const { filteredNotices, isLoading, searchQuery, selectedCategory } = useNotices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (filteredNotices.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-1">No notices found</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {searchQuery
            ? `No results for "${searchQuery}"`
            : selectedCategory !== 'all'
            ? `No notices in this category yet`
            : 'Check back later for new announcements'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredNotices.map((notice, index) => (
          <NoticeCard key={notice.id} notice={notice} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NoticeList;
