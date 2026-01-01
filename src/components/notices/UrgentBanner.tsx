import React from 'react';
import { mockNotices } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UrgentBanner: React.FC = () => {
  const navigate = useNavigate();
  const urgentNotices = mockNotices.filter((n) => n.priority === 'urgent');

  if (urgentNotices.length === 0) return null;

  const notice = urgentNotices[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card 
        className="bg-emergency/10 border-emergency/30 cursor-pointer overflow-hidden"
        onClick={() => navigate(`/notice/${notice.id}`)}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-emergency/20 flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-5 w-5 text-emergency" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <Badge variant="emergency" className="text-[10px] px-1.5 py-0">
                  URGENT
                </Badge>
              </div>
              <p className="font-medium text-sm text-foreground truncate">
                {notice.title.replace(/^🚨\s*/, '')}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {notice.excerpt}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UrgentBanner;
