'use client';

import {useEffect, useState} from 'react';
import Header from '@/layout/header/header';
import SidebarLayout from '@/layout/sidebar/sidebarLayout';
import {useFetchCategoriesQuery} from '@/redux/slices/categories/categoriesApi';
import {toast} from 'react-toastify';
import {socketService} from '@/utils/socketUtils';

export default function DashboardLayout({children}: {children: any}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useFetchCategoriesQuery();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleReviewNotification = (data: {
      userId: string;
      productId: string;
    }) => {
      toast.success(`New review added on product ${data.productId}`);
    };

    socketService.onReviewNotification(handleReviewNotification);

    return () => {
      socketService.offReviewNotification(handleReviewNotification);
    };
  }, []);

  return (
    <div>
      <SidebarLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <Header onToggleSidebar={toggleSidebar} />
        {children}
      </SidebarLayout>
    </div>
  );
}
