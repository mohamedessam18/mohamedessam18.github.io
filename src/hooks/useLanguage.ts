import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getNextLanguage } from '../i18n';
import type { Language } from '../i18n';

// Custom hook for language management with RTL support
export function useLanguage() {
  const [language, setLanguage] = useLocalStorage<Language>('portfolio-language', 'en');

  // Update HTML lang and dir attributes when language changes
  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Cycle to next language
  const cycleLanguage = useCallback(() => {
    setLanguage(getNextLanguage(language));
  }, [language, setLanguage]);

  return {
    language,
    setLanguage,
    cycleLanguage,
    isRTL: language === 'ar',
  };
}
