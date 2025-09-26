import React, { useState } from 'react';
import { Settings, HelpCircle, User as UserIcon, ChevronDown } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { useNavigation } from '../contexts/NavigationContext';
import { Language, User } from '../types';

interface HeaderProps {
  user?: User;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onUserClick?: () => void;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  user = { id: '1', name: '山田医師', role: 'admin' },
  onSettingsClick,
  onHelpClick,
  onUserClick,
  onNavigate
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleClinicNameClick = () => {
    onNavigate?.('dashboard');
  };

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    setShowLanguageDropdown(false);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return '管理者';
      case 'staff':
        return 'スタッフ';
      case 'provider':
        return '医師';
      default:
        return 'ユーザー';
    }
  };
  return (
    <header className="bg-[#73C7E3] shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Clinic Name - Left */}
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleClinicNameClick}
          >
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              {t('clinicName')}
            </h1>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                        currentLanguage.code === language.code ? 'bg-blue-50 text-[#2E4A70]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <button
              onClick={onSettingsClick}
              className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              title={t('settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="sr-only">{t('settings')}</span>
            </button>

            {/* Help */}
            <button
              onClick={onHelpClick}
              className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              title={t('help')}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="sr-only">{t('help')}</span>
            </button>

            {/* User Profile */}
            <button
              onClick={onUserClick}
              className="flex items-center space-x-2 px-2 sm:px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              title="ユーザープロフィール"
            >
              <UserIcon className="w-5 h-5" />
              <div className="hidden sm:flex sm:flex-col sm:items-start">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs opacity-80">{getRoleLabel(user.role)}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for closing dropdown */}
      {showLanguageDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;