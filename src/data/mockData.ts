import { Notice, User, CampusLocation, Comment, Notification } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  role: 'student',
  department: 'Computer Science',
  year: 3,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  isVerified: true,
};

export const mockLocations: CampusLocation[] = [
  {
    id: '1',
    name: 'Main Library',
    building: 'Central Library Building',
    coordinates: { lat: 40.7128, lng: -74.006 },
    zone: 'Academic Zone',
  },
  {
    id: '2',
    name: 'Engineering Building',
    building: 'Tech Center',
    coordinates: { lat: 40.7138, lng: -74.008 },
    zone: 'Engineering Zone',
  },
  {
    id: '3',
    name: 'Student Union',
    building: 'Student Center',
    coordinates: { lat: 40.7118, lng: -74.004 },
    zone: 'Social Zone',
  },
  {
    id: '4',
    name: 'Sports Complex',
    building: 'Athletics Center',
    coordinates: { lat: 40.7148, lng: -74.002 },
    zone: 'Athletics Zone',
  },
  {
    id: '5',
    name: 'Administration Building',
    building: 'Admin Hall',
    coordinates: { lat: 40.7108, lng: -74.01 },
    zone: 'Administrative Zone',
  },
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: '🚨 Campus Emergency Drill Tomorrow',
    content: `All students and faculty are required to participate in the campus-wide emergency drill scheduled for tomorrow at 10:00 AM.

## What to Expect
- Fire alarms will be activated across all buildings
- Please evacuate calmly using designated exit routes
- Assembly points will be marked with orange flags
- The drill will last approximately 30 minutes

## Important Instructions
1. Stop all work immediately when the alarm sounds
2. Do not use elevators
3. Assist anyone who needs help
4. Report to your designated assembly point
5. Wait for the all-clear signal before returning

For questions, contact Campus Security at ext. 2222.`,
    excerpt: 'Mandatory emergency drill for all campus members. Evacuate when alarms sound.',
    category: 'emergency',
    priority: 'urgent',
    author: {
      id: 'admin1',
      name: 'Campus Security',
      role: 'admin',
      department: 'Security Services',
      isVerified: true,
    },
    location: mockLocations[4],
    tags: ['emergency', 'safety', 'mandatory'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 1250,
    saveCount: 89,
    commentCount: 23,
    isPinned: true,
  },
  {
    id: '2',
    title: 'Fall Career Fair 2024 - 50+ Companies Hiring!',
    content: `Join us for the biggest career event of the semester! Over 50 top companies will be on campus looking for talented students.

## Participating Companies
- Google, Microsoft, Amazon, Apple
- Goldman Sachs, Morgan Stanley
- Tesla, SpaceX, Boeing
- And 40+ more!

## What to Bring
- Multiple copies of your resume
- Professional attire required
- Student ID for entry

## Workshops
- Resume Review: 9:00 AM - 10:00 AM
- Interview Tips: 12:00 PM - 1:00 PM
- LinkedIn Optimization: 3:00 PM - 4:00 PM

Register at career.university.edu to reserve your spot!`,
    excerpt: 'Connect with 50+ top employers. Bring your resume and dress professionally.',
    category: 'jobs',
    priority: 'high',
    author: {
      id: 'faculty1',
      name: 'Career Services',
      role: 'faculty',
      department: 'Student Affairs',
      isVerified: true,
    },
    location: mockLocations[2],
    tags: ['career', 'hiring', 'networking', 'jobs'],
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 2340,
    saveCount: 456,
    commentCount: 67,
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'New Library Hours for Finals Week',
    content: `To support your exam preparation, the Main Library will extend its operating hours during finals week.

## Extended Hours
- Monday - Thursday: 7:00 AM - 2:00 AM
- Friday: 7:00 AM - Midnight
- Saturday: 9:00 AM - Midnight
- Sunday: 10:00 AM - 2:00 AM

## Additional Resources
- Extra study rooms available (book via library app)
- Free coffee and snacks in the lobby
- Quiet zones strictly enforced
- Printing quota increased by 50 pages

Good luck with your exams!`,
    excerpt: 'Library extends hours until 2 AM during finals. Extra study rooms available.',
    category: 'academic',
    priority: 'medium',
    author: {
      id: 'faculty2',
      name: 'University Library',
      role: 'faculty',
      department: 'Library Services',
      isVerified: true,
    },
    location: mockLocations[0],
    tags: ['library', 'finals', 'study', 'extended-hours'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 890,
    saveCount: 234,
    commentCount: 12,
  },
  {
    id: '4',
    title: '🎸 Battle of the Bands - Sign Up Now!',
    content: `Think your band has what it takes? Show off your talent at this year's Battle of the Bands!

## Event Details
- Date: Saturday, December 14th
- Time: 6:00 PM - 11:00 PM
- Venue: Student Union Amphitheater

## Prizes
🥇 First Place: $1,000 + Recording session
🥈 Second Place: $500 + Professional photos
🥉 Third Place: $250 + Merch package

## How to Enter
1. Form a band (2-6 members)
2. Submit a demo video (max 3 min)
3. Registration deadline: December 5th

All genres welcome! Register at events.university.edu/battleofbands`,
    excerpt: 'Show your musical talent! Win prizes up to $1,000. Sign up by Dec 5th.',
    category: 'events',
    priority: 'medium',
    author: {
      id: 'student1',
      name: 'Student Activities Board',
      role: 'student',
      department: 'Student Government',
      isVerified: true,
    },
    location: mockLocations[2],
    tags: ['music', 'competition', 'entertainment', 'prizes'],
    eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 567,
    saveCount: 89,
    commentCount: 34,
  },
  {
    id: '5',
    title: 'Lost: MacBook Pro in Library',
    content: `I lost my MacBook Pro 14" (Space Gray) in the Main Library on Monday around 3 PM.

## Details
- Location: 3rd floor, study area near windows
- Color: Space Gray
- Stickers: React logo and "Code More" sticker
- Case: Black leather sleeve

## Reward
$100 reward for safe return, no questions asked.

If found, please contact me at:
- Email: sarah.m@university.edu
- Phone: (555) 123-4567

Thank you so much!`,
    excerpt: 'MacBook Pro lost in library. $100 reward for return. Contact Sarah.',
    category: 'lostfound',
    priority: 'medium',
    author: {
      id: 'student2',
      name: 'Sarah Martinez',
      role: 'student',
      department: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    location: mockLocations[0],
    tags: ['lost', 'laptop', 'reward', 'library'],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    viewCount: 234,
    saveCount: 12,
    commentCount: 8,
  },
  {
    id: '6',
    title: 'Free Yoga Sessions Every Wednesday',
    content: `De-stress and find your balance with our free weekly yoga sessions!

## Details
- Every Wednesday, 5:00 PM - 6:00 PM
- Location: Sports Complex, Room 204
- All levels welcome
- Mats provided (or bring your own)

## What to Wear
Comfortable clothing that allows movement. No shoes required.

## This Week's Theme
Stress Relief & Mindfulness

Instructor: Maya Thompson (Certified Yoga Instructor)

No registration needed - just show up! Questions? Email wellness@university.edu`,
    excerpt: 'Free yoga every Wednesday at 5 PM. All levels welcome, mats provided.',
    category: 'social',
    priority: 'low',
    author: {
      id: 'faculty3',
      name: 'Wellness Center',
      role: 'faculty',
      department: 'Health Services',
      isVerified: true,
    },
    location: mockLocations[3],
    tags: ['wellness', 'yoga', 'free', 'weekly'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 445,
    saveCount: 156,
    commentCount: 23,
    isBookmarked: true,
  },
  {
    id: '7',
    title: 'CS Department: Guest Lecture by Google Engineer',
    content: `The Computer Science department is proud to host a special guest lecture on Machine Learning in Production.

## Speaker
Dr. James Chen
Senior Staff Engineer, Google Brain
Stanford PhD, AI Research

## Topics Covered
- Scaling ML models to billions of users
- MLOps best practices
- Career paths in AI/ML
- Q&A session

## Details
- Date: Friday, December 6th
- Time: 2:00 PM - 4:00 PM
- Location: Engineering Building, Room 301
- Free pizza after the talk!

Limited seats - register at cs.university.edu/events`,
    excerpt: 'Google engineer talks ML at scale. Friday 2PM, free pizza included.',
    category: 'academic',
    priority: 'high',
    author: {
      id: 'faculty4',
      name: 'Dr. Emily Watson',
      role: 'faculty',
      department: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    location: mockLocations[1],
    tags: ['lecture', 'google', 'machine-learning', 'career'],
    eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 678,
    saveCount: 234,
    commentCount: 45,
  },
  {
    id: '8',
    title: 'Tutoring Available: Math & Physics',
    content: `Struggling with Calculus or Physics? I'm here to help!

## About Me
- 4th year Physics major, 3.9 GPA
- 2 years tutoring experience
- Patient and understanding approach

## Subjects
- Calculus I, II, III
- Linear Algebra
- Physics I & II
- Differential Equations

## Rates
- $20/hour individual
- $15/hour group (2-4 students)
- First session 50% off!

## Availability
- Mon, Wed, Fri: 3 PM - 8 PM
- Weekends: Flexible

Contact: mike.tutoring@university.edu`,
    excerpt: 'Physics major offering affordable math/physics tutoring. First session 50% off.',
    category: 'academic',
    priority: 'low',
    author: {
      id: 'student3',
      name: 'Mike Anderson',
      role: 'student',
      department: 'Physics',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    tags: ['tutoring', 'math', 'physics', 'help'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 189,
    saveCount: 67,
    commentCount: 15,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    noticeId: '1',
    author: {
      id: 'student4',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'student',
    },
    content: 'What time exactly should we expect the drill to end? I have a class at 10:30.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    isLiked: false,
  },
  {
    id: '2',
    noticeId: '1',
    author: {
      id: 'admin1',
      name: 'Campus Security',
      role: 'admin',
    },
    content: 'The drill should conclude by 10:30 AM. Classes will resume at 10:45 AM to allow time for everyone to return.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 45,
    isLiked: true,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'emergency',
    title: 'Emergency Drill Tomorrow',
    message: 'Campus-wide emergency drill scheduled for 10:00 AM',
    noticeId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Event Reminder',
    message: 'Career Fair starts in 7 days. Don\'t forget to bring your resume!',
    noticeId: '2',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'comment',
    title: 'New Comment',
    message: 'Campus Security replied to the emergency drill notice',
    noticeId: '1',
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];
