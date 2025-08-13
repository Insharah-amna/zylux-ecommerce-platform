'use client';

import {useState} from 'react';
import Header from '@/layout/header/header';
import SidebarLayout from '@/layout/sidebar/sidebarLayout';
import {useFetchCategoriesQuery} from '@/redux/slices/categories/categoriesApi';

export default function DashboardLayout({children}: {children: any}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useFetchCategoriesQuery();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <SidebarLayout sidebarOpen={sidebarOpen}>
        <Header onToggleSidebar={toggleSidebar} />
        {children}
      </SidebarLayout>
    </div>
  );
}
