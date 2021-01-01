import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ru from './ru.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: en
      },
      ru: {
        translation: ru
      }
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    },
    react: {
        wait: true,
    },
  });

export default i18n;