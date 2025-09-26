import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SideMenuProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ currentPage = 'dashboard', onNavigate }) => {
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'ダッシュボード', 
      icon: LayoutDashboard, 
      action: () => onNavigate?.('dashboard')
    },
    { 
      id: 'patients', 
      label: '患者管理', 
      icon: Users, 
      action: () => onNavigate?.('patients')
    },
    { 
      id: 'appointments', 
      label: '予約管理', 
      icon: Calendar, 
      action: () => onNavigate?.('appointments')
    },
    { 
      id: 'records', 
      label: '診療記録', 
      icon: FileText, 
      action: () => onNavigate?.('records')
    },
    { 
      id: 'reports', 
      label: 'レポート', 
      icon: BarChart3, 
      action: () => onNavigate?.('reports')
    },
    { 
      id: 'settings', 
      label: '設定', 
      icon: Settings, 
      action: () => onNavigate?.('settings')
    },
    { 
      id: 'notifications', 
      label: '通知', 
      icon: Bell, 
      action: () => onNavigate?.('notifications')
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    item.action();
    setIsMobileOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-20 left-4 z-50 bg-[#2E4A70] text-white p-2 rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Side Menu */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden lg:flex justify-end p-2 border-b border-gray-100">
          <button
            onClick={toggleCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#2E4A70] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#F0F2F2] hover:text-[#2E4A70]'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'flex-shrink-0'}`} />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500 text-center">
            クリニック管理システム
          </div>
        )}
      </aside>
    </>
  );
};

export default SideMenu;