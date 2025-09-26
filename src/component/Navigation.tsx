import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { BreadcrumbItem } from '../types';

interface NavigationProps {
  breadcrumbs?: BreadcrumbItem[];
  onBackClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ breadcrumbs, onBackClick }) => {
  const { t } = useLanguage();
  const { goBack, goForward, canGoBack, canGoForward } = useNavigation();

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBackClick) {
      onBackClick();
    } else {
      goBack();
    }
  };

  const handleForwardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    goForward();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-3">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              disabled={!canGoBack && !onBackClick}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                canGoBack || onBackClick
                  ? 'text-[#2E4A70] border-[#2E4A70] hover:bg-[#2E4A70] hover:text-white cursor-pointer transform hover:scale-105'
                  : 'text-gray-300 border-gray-300 cursor-not-allowed'
              }`}
              title="戻る"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Forward Button */}
            <button
              onClick={handleForwardClick}
              disabled={!canGoForward}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                canGoForward
                  ? 'text-[#2E4A70] border-[#2E4A70] hover:bg-[#2E4A70] hover:text-white cursor-pointer transform hover:scale-105'
                  : 'text-gray-300 border-gray-300 cursor-not-allowed'
              }`}
              title="進む"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm">
              <Home className="w-4 h-4 text-gray-400" />
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  {item.path ? (
                    <a
                      href={item.path}
                      className="text-[#2E4A70] hover:text-[#24B0BA] font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;