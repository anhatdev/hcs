import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingButtons: React.FC = () => {
  const { t } = useLanguage();
  const [showButtons, setShowButtons] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show buttons when scrolled down at least half a page
      const shouldShow = currentScrollY > windowHeight / 2;
      setShowButtons(shouldShow);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  if (!showButtons) return null;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col space-y-2">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="bg-[#2E4A70] hover:bg-[#24B0BA] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        title={t('scrollToTop')}
        aria-label={t('scrollToTop')}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Scroll to Bottom */}
      <button
        onClick={scrollToBottom}
        className="bg-[#2E4A70] hover:bg-[#24B0BA] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        title={t('scrollToBottom')}
        aria-label={t('scrollToBottom')}
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;