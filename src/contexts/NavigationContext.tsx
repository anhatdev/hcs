import React, { createContext, useContext, useState, useEffect } from 'react';
import { BreadcrumbItem } from '../types';

interface NavigationContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  navigateTo: (page: string) => void;
  currentPage: string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children, 
  currentPage, 
  onNavigate 
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [history, setHistory] = useState<string[]>(['dashboard']);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update history when currentPage changes
  useEffect(() => {
    if (currentPage && currentPage !== history[currentIndex]) {
      // Remove any forward history when navigating to a new page
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(currentPage);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  }, [currentPage]);

  const goBack = () => {
    if (canGoBack) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      const previousPage = history[newIndex];
      onNavigate(previousPage);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      const nextPage = history[newIndex];
      onNavigate(nextPage);
    }
  };

  const navigateTo = (page: string) => {
    onNavigate(page);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return (
    <NavigationContext.Provider value={{
      breadcrumbs,
      setBreadcrumbs,
      goBack,
      goForward,
      canGoBack,
      canGoForward,
      navigateTo,
      currentPage
    }}>
      {children}
    </NavigationContext.Provider>
  );
};