import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Notice, NoticeCategory } from '@/types';
import { mockNotices } from '@/data/mockData';

interface NoticesContextType {
  notices: Notice[];
  filteredNotices: Notice[];
  selectedCategory: NoticeCategory | 'all';
  searchQuery: string;
  isLoading: boolean;
  setSelectedCategory: (category: NoticeCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  getNoticeById: (id: string) => Notice | undefined;
  toggleBookmark: (id: string) => void;
  refreshNotices: () => Promise<void>;
}

const NoticesContext = createContext<NoticesContextType | undefined>(undefined);

export const NoticesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort by priority and pinned status
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getNoticeById = useCallback(
    (id: string) => notices.find((notice) => notice.id === id),
    [notices]
  );

  const toggleBookmark = useCallback((id: string) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id
          ? { ...notice, isBookmarked: !notice.isBookmarked, saveCount: notice.isBookmarked ? notice.saveCount - 1 : notice.saveCount + 1 }
          : notice
      )
    );
  }, []);

  const refreshNotices = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNotices(mockNotices);
    setIsLoading(false);
  };

  return (
    <NoticesContext.Provider
      value={{
        notices,
        filteredNotices: sortedNotices,
        selectedCategory,
        searchQuery,
        isLoading,
        setSelectedCategory,
        setSearchQuery,
        getNoticeById,
        toggleBookmark,
        refreshNotices,
      }}
    >
      {children}
    </NoticesContext.Provider>
  );
};

export const useNotices = () => {
  const context = useContext(NoticesContext);
  if (context === undefined) {
    throw new Error('useNotices must be used within a NoticesProvider');
  }
  return context;
};
