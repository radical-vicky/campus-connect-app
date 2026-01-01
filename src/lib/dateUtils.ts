import { formatDistanceToNow, format, isToday, isTomorrow, isThisWeek } from 'date-fns';

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }
  
  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'h:mm a')}`;
  }
  
  if (isThisWeek(date)) {
    return format(date, "EEEE 'at' h:mm a");
  }
  
  return format(date, "MMM d 'at' h:mm a");
};

export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMMM d, yyyy h:mm a');
};
