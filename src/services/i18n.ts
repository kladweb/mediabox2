import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruHeader from '../locales/ru/header.json';
import enHeader from '../locales/en/header.json';
import ruMain from '../locales/ru/main.json';
import enMain from '../locales/en/main.json';
import ruOperators from '../locales/ru/operators.json';
import enOperators from '../locales/en/operators.json';
import ruShared from '../locales/ru/shared.json';
import enShared from '../locales/en/shared.json';
import enAbout from '../locales/en/about.json';
import ruAbout from '../locales/ru/about.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        header: enHeader,
        main: enMain,
        operators: enOperators,
        shared: enShared,
        about: enAbout
      },
      ru: {
        header: ruHeader,
        main: ruMain,
        operators: ruOperators,
        shared: ruShared,
        about: ruAbout
      },
    },
    debug: false,
    fallbackLng: 'en'
  });

export default i18n;
