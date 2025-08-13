import {ReactNode} from 'react';

export interface HeaderProps {
  onToggleSidebar: () => void;
}

export interface SidebarProps {
  isOpen: Boolean;
}

export interface SidebarLayoutProps {
  children: ReactNode;
  sidebarOpen: Boolean;
}
