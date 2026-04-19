'use client'
import { useState, useEffect } from 'react'
import { getLang, getStrings, interpolate, translatePhase, type Strings } from '@/lib/i18n'

export function useTranslation() {
  const [lang, setLang] = useState('en')
  const [t, setT] = useState<Strings>(() => getStrings('en'))

  useEffect(() => {
    const current = getLang()
    setLang(current)
    setT(getStrings(current))

    // Poll for same-tab changes (localStorage doesn't fire storage event in the same tab)
    const interval = setInterval(() => {
      const next = getLang()
      if (next !== lang) {
        setLang(next)
        setT(getStrings(next))
      }
    }, 500)

    // Cross-tab changes
    function onStorage(e: StorageEvent) {
      if (e.key === 'hive_lang') {
        const next = e.newValue || 'en'
        setLang(next)
        setT(getStrings(next))
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', onStorage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fmt(template: string, vars: Record<string, string | number>): string {
    return interpolate(template, vars)
  }

  function phase(englishPhase: string): string {
    return translatePhase(englishPhase, lang)
  }

  return { t, lang, fmt, phase }
}
