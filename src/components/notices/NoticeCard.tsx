import React from 'react';
import { Notice } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCategoryIcon } from '@/lib/categories';
import { formatRelativeTime, formatEventDate } from '@/lib/dateUtils';
import { 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Eye,
  Pin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotices } from '@/contexts/NoticesContext';

interface NoticeCardProps {
  notice: Notice;
  index?: number;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, index = 0 }) => {
  const navigate = useNavigate();
  const { toggleBookmark } = useNotices();
  const CategoryIcon = getCategoryIcon(notice.category);

  const handleClick = () => {
    navigate(`/notice/${notice.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(notice.id);
  };

  const isUrgent = notice.priority === 'urgent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card 
        className={`cursor-pointer card-hover overflow-hidden ${
          isUrgent ? 'border-emergency/50 bg-emergency/5' : ''
        }`}
        onClick={handleClick}
      >
        <CardContent className="p-4">
          {/* Header with category and actions */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={notice.category as any} className="gap-1">
                <CategoryIcon className="h-3 w-3" />
                {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
              </Badge>
              {notice.isPinned && (
                <Badge variant="outline" className="gap-1 text-primary">
                  <Pin className="h-3 w-3" />
                  Pinned
                </Badge>
              )}
              {notice.priority === 'urgent' && (
                <Badge variant="urgent" className="gap-1">
                  Urgent
                </Badge>
              )}
              {notice.priority === 'high' && (
                <Badge variant="high" className="gap-1">
                  Important
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleBookmark}
              className={notice.isBookmarked ? 'text-accent' : 'text-muted-foreground'}
            >
              {notice.isBookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-base">
            {notice.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {notice.excerpt}
          </p>

          {/* Event date if applicable */}
          {notice.eventDate && (
            <div className="flex items-center gap-1.5 text-sm text-primary mb-3">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{formatEventDate(notice.eventDate)}</span>
            </div>
          )}

          {/* Location */}
          {notice.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span>{notice.location.name}</span>
            </div>
          )}

          {/* Footer with metadata */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1">
              {notice.author.avatar ? (
                <img
                  src={notice.author.avatar}
                  alt={notice.author.name}
                  className="h-5 w-5 rounded-full object-cover"
                />
              ) : (
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {notice.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-xs text-muted-foreground ml-1">
                {notice.author.name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {notice.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {notice.commentCount}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(notice.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoticeCard;
