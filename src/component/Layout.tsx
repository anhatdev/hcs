import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import FloatingButtons from './FloatingButtons';
import SideMenu from './SideMenu';
import { BreadcrumbItem, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  user?: User;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onUserClick?: () => void;
  onBackClick?: () => void;
  showNavigation?: boolean;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumbs,
  user,
  onSettingsClick,
  onHelpClick,
  onUserClick,
  onBackClick,
  showNavigation = true,
  currentPage = 'dashboard',
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Header
        user={user}
        onSettingsClick={onSettingsClick}
        onHelpClick={onHelpClick}
        onUserClick={onUserClick}
        onNavigate={onNavigate}
      />
      
      <SideMenu currentPage={currentPage} onNavigate={onNavigate} />
      
      {showNavigation && (
        <Navigation
          breadcrumbs={breadcrumbs}
          onBackClick={onBackClick}
        />
      )}

      <main className="lg:ml-64 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300">
        {children}
      </main>

      <FloatingButtons />
    </div>
  );
};

export default Layout;