import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  department: string;
  avatar_url: string | null;
  year: number | null;
  is_verified: boolean;
}

interface UserRole {
  role: 'student' | 'faculty' | 'admin';
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;
  avatar?: string;
  year?: number;
  isVerified: boolean;
}

export function useAuthState() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer Supabase calls with setTimeout to avoid deadlock
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile and role in parallel
      const [profileResult, roleResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle(),
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .maybeSingle()
      ]);

      if (profileResult.data) {
        const profile = profileResult.data as Profile;
        const userRole = (roleResult.data as UserRole)?.role || 'student';
        
        setUser({
          id: userId,
          name: profile.name,
          email: profile.email,
          role: userRole,
          department: profile.department,
          avatar: profile.avatar_url || undefined,
          year: profile.year || undefined,
          isVerified: profile.is_verified,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const refreshUser = async () => {
    if (session?.user) {
      await fetchUserData(session.user.id);
    }
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    logout,
    refreshUser,
  };
}
