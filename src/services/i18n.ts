import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruHeader from '../locales/ru/header.json';
import enHeader from '../locales/en/header.json';
import ruMain from '../locales/ru/main.json';
import enMain from '../locales/en/main.json';
import ruOperators from '../locales/ru/operators.json'
import enOperators from '../locales/en/operators.json'

// const en =  fetch ("/locales/en/translation.json");
// const ru =  fetch ("/locales/ru/translation.json");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        header: enHeader,
        main: enMain,
        operators: enOperators
      },
      ru: {
        header: ruHeader,
        main: ruMain,
        operators: ruOperators
      },
    },
    debug: false,
    fallbackLng: 'en'
  });

export default i18n;
