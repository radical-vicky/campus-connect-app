import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { categories } from '@/lib/categories';
import { useNotices } from '@/contexts/NoticesContext';
import { NoticeCategory } from '@/types';
import { getCategoryIcon } from '@/lib/categories';
import { LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, notices } = useNotices();

  const getCategoryCount = (category: NoticeCategory | 'all') => {
    if (category === 'all') return notices.length;
    return notices.filter((n) => n.category === category).length;
  };

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {/* All button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="filter"
              size="sm"
              data-active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className="gap-1.5 shrink-0"
            >
              <LayoutGrid className="h-4 w-4" />
              All
              <span className="ml-1 text-xs opacity-70">
                ({getCategoryCount('all')})
              </span>
            </Button>
          </motion.div>

          {/* Category buttons */}
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            const count = getCategoryCount(category.id);
            return (
              <motion.div
                key={category.id}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="filter"
                  size="sm"
                  data-active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-1.5 shrink-0"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                  <span className="ml-1 text-xs opacity-70">({count})</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
