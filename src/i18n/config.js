import i18n from 'i18next';
import translationEN from './en/translationEN.json';
import translationRO from './ro/translationRO.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: translationEN,
  },
  ro: {
    translation: translationRO,
  }
};

i18n.use(initReactI18next)
.init({
    resources,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
});

export default i18n;