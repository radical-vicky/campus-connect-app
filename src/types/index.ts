export type NoticeCategory = 
  | 'academic' 
  | 'events' 
  | 'emergency' 
  | 'social' 
  | 'jobs' 
  | 'lostfound';

export type UserRole = 'student' | 'faculty' | 'admin';

export type NoticePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  year?: number; // For students
  isVerified: boolean;
}

export interface CampusLocation {
  id: string;
  name: string;
  building: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zone: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: NoticeCategory;
  priority: NoticePriority;
  author: {
    id: string;
    name: string;
    role: UserRole;
    department: string;
    avatar?: string;
    isVerified: boolean;
  };
  location?: CampusLocation;
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  tags: string[];
  eventDate?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  saveCount: number;
  commentCount: number;
  isBookmarked?: boolean;
  isPinned?: boolean;
}

export interface Comment {
  id: string;
  noticeId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: UserRole;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface Notification {
  id: string;
  type: 'notice' | 'comment' | 'reminder' | 'emergency';
  title: string;
  message: string;
  noticeId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface CategoryInfo {
  id: NoticeCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}
