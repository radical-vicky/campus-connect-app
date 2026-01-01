import { NoticeCategory, CategoryInfo } from '@/types';
import { 
  BookOpen, 
  Calendar, 
  AlertTriangle, 
  Users, 
  Briefcase, 
  Search as SearchIcon
} from 'lucide-react';

export const categories: CategoryInfo[] = [
  {
    id: 'academic',
    label: 'Academic',
    icon: 'BookOpen',
    color: 'academic',
    description: 'Classes, exams, lectures, and academic resources',
  },
  {
    id: 'events',
    label: 'Events',
    icon: 'Calendar',
    color: 'events',
    description: 'Campus events, workshops, and activities',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: 'AlertTriangle',
    color: 'emergency',
    description: 'Urgent safety alerts and important announcements',
  },
  {
    id: 'social',
    label: 'Social',
    icon: 'Users',
    color: 'social',
    description: 'Clubs, meetups, and social activities',
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: 'Briefcase',
    color: 'jobs',
    description: 'Internships, part-time jobs, and career opportunities',
  },
  {
    id: 'lostfound',
    label: 'Lost & Found',
    icon: 'SearchIcon',
    color: 'lostfound',
    description: 'Lost items and found belongings',
  },
];

export const getCategoryInfo = (category: NoticeCategory): CategoryInfo => {
  return categories.find((c) => c.id === category) || categories[0];
};

export const getCategoryIcon = (category: NoticeCategory) => {
  const iconMap: Record<NoticeCategory, React.ComponentType<{ className?: string }>> = {
    academic: BookOpen,
    events: Calendar,
    emergency: AlertTriangle,
    social: Users,
    jobs: Briefcase,
    lostfound: SearchIcon,
  };
  return iconMap[category];
};
