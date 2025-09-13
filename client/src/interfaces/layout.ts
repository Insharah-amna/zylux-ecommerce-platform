import {Dispatch, ReactNode, SetStateAction} from 'react';

export interface HeaderProps {
  onToggleSidebar: () => void;
}

export interface SidebarProps {
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarLayoutProps {
  children: ReactNode;
  sidebarOpen: Boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
