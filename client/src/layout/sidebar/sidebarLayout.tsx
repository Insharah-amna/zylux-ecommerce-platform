'use client';

import {SidebarLayoutProps} from '@/interfaces/layout';
import Sidebar from './sidebar';

const SidebarLayout = ({
  children,
  sidebarOpen,
  setSidebarOpen,
}: SidebarLayoutProps) => {
  return (
    <div>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className='pt-16 lg:pl-64'>{children}</main>
    </div>
  );
};

export default SidebarLayout;
