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
  NAVBAR_URLS,
} from '@/utils/PATHS';
import {USER_ROLES} from '@/constants/generals';

const AuthGuard = ({children}: NodeChildrenProps) => {
  const router = useRouter();

  const pathname = usePathname();

  const isAuthRoutes = pathname.startsWith(AUTH_ROOT);
  const isDashboardRoutes = pathname.startsWith(DASHBOARD_ROOT);

  const isAdminRole = USER_ROLES.admin.value;

  const user = useSelector(getCurrentUser);

  const isLoggedIn = !!user;
  const role = user?.role;

  useEffect(() => {
    if (isAuthRoutes && isLoggedIn) {
      router.push(DASHBOARD_ROUTES.categories);
      return;
    }

    if (isDashboardRoutes && !isLoggedIn) {
      router.push(AUTH_ROUTES.login);
      return;
    }

    if (isDashboardRoutes && role !== isAdminRole) {
      router.push(NAVBAR_URLS.home);
      return;
    }
  }, [isLoggedIn, isAuthRoutes, isDashboardRoutes]);

  return children;
};

export default AuthGuard;
