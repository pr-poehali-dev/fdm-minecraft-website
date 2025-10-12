import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthUser } from '@/lib/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const authUser = getAuthUser();

  useEffect(() => {
    if (!authUser) {
      navigate('/login', { replace: true });
    }
  }, [authUser, navigate]);

  if (!authUser) {
    return null;
  }

  return <>{children}</>;
}
