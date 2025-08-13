'use client';

import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getCurrentUser} from '@/redux/slices/users/usersSlice';
import {NodeChildrenProps} from '@/interfaces/common';
import {
  AUTH_ROOT,
  AUTH_ROUTES,
  DASHBOARD_ROOT,
  DASHBOARD_ROUTES,
} from '@/utils/PATHS';

const AuthGuard = ({children}: NodeChildrenProps) => {
  const router = useRouter();

  const pathname = usePathname();

  const isAuthRoutes = pathname.startsWith(AUTH_ROOT);
  const isDashboardRoutes = pathname.startsWith(DASHBOARD_ROOT);

  const user = useSelector(getCurrentUser);

  const isLoggedIn = !!user;

  useEffect(() => {
    if (isAuthRoutes && isLoggedIn) {
      router.push(DASHBOARD_ROUTES.categories);
    }

    if (isDashboardRoutes && !isLoggedIn) {
      router.push(AUTH_ROUTES.login);
    }
  }, [isLoggedIn, isAuthRoutes, isDashboardRoutes]);

  return children;
};

export default AuthGuard;
