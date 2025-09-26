import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
];

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    clinicName: 'ヘルスケアクリニック',
    dashboard: 'ダッシュボード',
    settings: '設定',
    help: 'ヘルプ',
    notifications: '通知',
    back: '戻る',
    scrollToTop: 'トップへ戻る',
    scrollToBottom: '一番下へ',
    language: '言語',
    faq: 'よくある質問',
    contactProvider: 'プロバイダーに連絡',
    maintenanceAlert: 'メンテナンス警告',
    systemIssue: 'システムの問題',
    noNotifications: '新しい通知はありません'
  },
  ja: {
    clinicName: 'ヘルスケアクリニック',
    dashboard: 'ダッシュボード',
    settings: '設定',
    help: 'ヘルプ',
    notifications: '通知',
    back: '戻る',
    scrollToTop: 'トップへ戻る',
    scrollToBottom: '一番下へ',
    language: '言語',
    faq: 'よくある質問',
    contactProvider: 'プロバイダーに連絡',
    maintenanceAlert: 'メンテナンス警告',
    systemIssue: 'システムの問題',
    noNotifications: '新しい通知はありません'
  },
  ko: {
    clinicName: '헬스케어 클리닉',
    dashboard: '대시보드',
    settings: '설정',
    help: '도움말',
    notifications: '알림',
    back: '뒤로',
    scrollToTop: '맨 위로',
    scrollToBottom: '맨 아래로',
    language: '언어',
    faq: '자주 묻는 질문',
    contactProvider: '제공자 연락',
    maintenanceAlert: '유지보수 경고',
    systemIssue: '시스템 문제',
    noNotifications: '새 알림이 없습니다'
  },
  zh: {
    clinicName: '医疗保健诊所',
    dashboard: '仪表板',
    settings: '设置',
    help: '帮助',
    notifications: '通知',
    back: '返回',
    scrollToTop: '回到顶部',
    scrollToBottom: '滚动到底部',
    language: '语言',
    faq: '常见问题',
    contactProvider: '联系提供商',
    maintenanceAlert: '维护警报',
    systemIssue: '系统问题',
    noNotifications: '没有新通知'
  },
  vi: {
    clinicName: 'Phòng khám Y tế',
    dashboard: 'Bảng điều khiển',
    settings: 'Cài đặt',
    help: 'Trợ giúp',
    notifications: 'Thông báo',
    back: 'Quay lại',
    scrollToTop: 'Lên đầu trang',
    scrollToBottom: 'Xuống cuối trang',
    language: 'Ngôn ngữ',
    faq: 'Câu hỏi thường gặp',
    contactProvider: 'Liên hệ nhà cung cấp',
    maintenanceAlert: 'Cảnh báo bảo trì',
    systemIssue: 'Sự cố hệ thống',
    noNotifications: 'Không có thông báo mới'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[1]); // Default to Japanese

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguageCode = localStorage.getItem('clinicLanguage');
    if (savedLanguageCode) {
      const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('clinicLanguage', language.code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { languages };