import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruHeader from '../locales/ru/header.json';
import enHeader from '../locales/en/header.json';
import ruMain from '../locales/ru/main.json';
import enMain from '../locales/en/main.json';

// const en =  fetch ("/locales/en/translation.json");
// const ru =  fetch ("/locales/ru/translation.json");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {header: enHeader, main: enMain},
      ru: {header: ruHeader, main: ruMain},
    },
    debug: false,
    fallbackLng: 'en'
  });

export default i18n;
