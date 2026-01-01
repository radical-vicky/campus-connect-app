import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Bell, 
  MapPin, 
  Calendar, 
  Eye, 
  MessageCircle,
  Clock,
  CheckCircle,
  Send,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useNotices } from '@/contexts/NoticesContext';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoryIcon } from '@/lib/categories';
import { formatRelativeTime, formatEventDate, formatFullDate } from '@/lib/dateUtils';
import { mockComments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNoticeById, toggleBookmark } = useNotices();
  const { user } = useAuth();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [hasReminder, setHasReminder] = useState(false);

  const notice = getNoticeById(id || '');

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Notice not found</h2>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(notice.category);
  const comments = mockComments.filter((c) => c.noticeId === notice.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: notice.title,
          text: notice.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Notice link has been copied to clipboard.',
      });
    }
  };

  const handleReminder = () => {
    setHasReminder(!hasReminder);
    toast({
      title: hasReminder ? 'Reminder removed' : 'Reminder set!',
      description: hasReminder 
        ? 'You will no longer receive a reminder.'
        : 'You will be notified before the event.',
    });
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    toast({
      title: 'Comment posted!',
      description: 'Your comment has been added.',
    });
    setComment('');
  };

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleBookmark(notice.id)}
              >
                {notice.isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-accent" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              {notice.eventDate && (
                <Button
                  variant={hasReminder ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={handleReminder}
                >
                  <Bell className={`h-5 w-5 ${hasReminder ? 'text-accent' : ''}`} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-2xl mx-auto px-4 py-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Category & Priority */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={notice.category as any} className="gap-1">
              <CategoryIcon className="h-3 w-3" />
              {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
            </Badge>
            {notice.priority === 'urgent' && (
              <Badge variant="urgent">Urgent</Badge>
            )}
            {notice.priority === 'high' && (
              <Badge variant="high">Important</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {notice.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={notice.author.avatar} />
              <AvatarFallback>{notice.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{notice.author.name}</span>
                {notice.author.isVerified && (
                  <CheckCircle className="h-4 w-4 text-info" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {notice.author.department} • {formatRelativeTime(notice.createdAt)}
              </p>
            </div>
          </div>

          {/* Event Date */}
          {notice.eventDate && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Event Date</p>
                  <p className="font-semibold text-primary">
                    {formatEventDate(notice.eventDate)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location */}
          {notice.location && (
            <Card 
              className="cursor-pointer card-hover"
              onClick={() => navigate('/map')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-info" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{notice.location.name}</p>
                  <p className="text-xs text-muted-foreground">{notice.location.building}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {notice.content}
            </div>
          </div>

          {/* Tags */}
          {notice.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {notice.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 py-4 border-t border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{notice.viewCount} views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bookmark className="h-4 w-4" />
              <span>{notice.saveCount} saves</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatFullDate(notice.createdAt)}</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({comments.length})
            </h3>

            {/* Add Comment */}
            {user && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <Button
                    size="sm"
                    onClick={handleSubmitComment}
                    disabled={!comment.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Post
                  </Button>
                </div>
              </div>
            )}

            {/* Comment List */}
            <div className="space-y-4">
              {comments.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={c.author.avatar} />
                    <AvatarFallback>{c.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{c.author.name}</span>
                        <Badge variant={c.author.role as any} className="text-[10px] px-1.5 py-0">
                          {c.author.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{c.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 px-1">
                      <button className={`flex items-center gap-1 text-xs ${c.isLiked ? 'text-accent' : 'text-muted-foreground'}`}>
                        <ThumbsUp className="h-3 w-3" />
                        {c.likes}
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(c.createdAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NoticeDetail;
