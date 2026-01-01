import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Settings,
  ChevronRight,
  Bookmark,
  Bell,
  MapPin,
  Shield,
  LogOut,
  User as UserIcon,
  GraduationCap,
  Building,
  Mail,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useNotices } from '@/contexts/NoticesContext';
import { UserRole } from '@/types';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, switchRole, logout } = useAuth();
  const { notices } = useNotices();

  const savedNotices = notices.filter((n) => n.isBookmarked);

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'warning';
      case 'faculty':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const menuItems = [
    {
      icon: Bookmark,
      label: 'Saved Notices',
      value: savedNotices.length,
      onClick: () => {},
    },
    {
      icon: Bell,
      label: 'Notification Settings',
      onClick: () => {},
    },
    {
      icon: MapPin,
      label: 'Location Preferences',
      onClick: () => {},
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      onClick: () => {},
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Profile</h1>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <Badge variant={getRoleBadgeVariant(user.role) as any} className="mb-3">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                
                <div className="grid grid-cols-2 gap-4 w-full mt-4 text-sm">
                  <div className="flex items-center gap-2 justify-center text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{user.department}</span>
                  </div>
                  {user.year && (
                    <div className="flex items-center gap-2 justify-center text-muted-foreground col-span-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Year {user.year} Student</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-2xl font-bold text-primary">{savedNotices.length}</p>
                <p className="text-xs text-muted-foreground">Saved</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-2xl font-bold text-events">12</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-2xl font-bold text-info">5</p>
                <p className="text-xs text-muted-foreground">Comments</p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Role Switcher */}
          <Card className="border-dashed border-2 border-accent/50 bg-accent/5">
            <CardContent className="py-4">
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Demo: Switch Role
              </p>
              <div className="flex gap-2">
                {(['student', 'faculty', 'admin'] as UserRole[]).map((role) => (
                  <Button
                    key={role}
                    variant={user.role === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => switchRole(role)}
                    className="flex-1"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Menu Items */}
          <Card>
            <CardContent className="p-0">
              {menuItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value !== undefined && (
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                  {index < menuItems.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardContent className="py-4 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Alerts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Event Reminders</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Department Notices</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Social Updates</span>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/50 hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
