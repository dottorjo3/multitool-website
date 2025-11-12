import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationIT from './locales/it/common.json';
import translationEN from './locales/en/common.json';

// Rileva lingua browser o usa quella salvata
const savedLanguage = localStorage.getItem('language') || 
  navigator.language.split('-')[0] || 
  'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        translation: translationIT
      },
      en: {
        translation: translationEN
      }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Salva lingua quando cambia
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;

