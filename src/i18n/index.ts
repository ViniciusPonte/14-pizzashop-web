import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import englishTranslations from './en.json'
import spanishTranslations from './es.json'
import portugueseTranslations from './pt.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: englishTranslations,
      pt: portugueseTranslations,
      es: spanishTranslations,
    },
  })

export default i18n
