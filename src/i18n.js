import { createContext, useContext } from 'react'

// Two languages, English and Ukrainian. Any text on the site can be written as
// { en, ua } and passed through t() from useT(); plain strings pass through
// unchanged, so a word that is the same in both (ATMARAKSI) needs no pair.
export const LANGUAGES = ['UA', 'EN']
export const DEFAULT_LANGUAGE = 'EN'

export const LanguageContext = createContext({ lang: DEFAULT_LANGUAGE, setLang: () => {} })

export function useLang() {
  return useContext(LanguageContext)
}

export function useT() {
  const { lang } = useLang()
  return (value) => {
    if (value === null || typeof value !== 'object' || !('en' in value)) return value
    return lang === 'UA' ? value.ua : value.en
  }
}

// Dates written the way each language writes them: "14 October 2026" /
// "14 жовтня 2026 р.".
export function useFormatDate() {
  const { lang } = useLang()
  return (iso) =>
    new Intl.DateTimeFormat(lang === 'UA' ? 'uk-UA' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))
}
