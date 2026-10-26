import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, LanguageContext } from '../i18n'

const STORAGE_KEY = 'atmaraksi-lang'

// Remembers the visitor's choice in this browser, so a reload or the contact
// page keeps the language they picked. Storage can be unavailable (private
// mode), in which case the site simply starts in English each time.
function readStored() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStored)

  useEffect(() => {
    document.documentElement.lang = lang === 'UA' ? 'uk' : 'en'
    document.title =
      lang === 'UA' ? 'ATMARAKSI — VR-тренажери для військових' : 'ATMARAKSI — VR training systems'
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Not remembered; the switch still works for this visit.
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
