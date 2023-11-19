import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './languages/en.json';
import tr from './languages/tr.json';

let initialized = false;

export function initI18next() {
  if (!initialized) {
    initialized = true;
    i18n.use(initReactI18next).init({
      debug: false,
      resources: { en: { translation: en }, tr: { translation: tr } },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      returnNull: false,
    });
  }
}
