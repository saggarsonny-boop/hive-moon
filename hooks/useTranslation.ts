'use client'
import { useState, useEffect, useRef } from 'react'
import { getLang, getStrings, interpolate, translatePhase, type Strings } from '@/lib/i18n'

export function useTranslation() {
  const [lang, setLang] = useState('en')
  const [t, setT] = useState<Strings>(() => getStrings('en'))
  const langRef = useRef(lang)

  useEffect(() => {
    const current = getLang()
    langRef.current = current
    setLang(current)
    setT(getStrings(current))

    // Poll for same-tab changes — use ref to avoid stale closure
    const interval = setInterval(() => {
      const next = getLang()
      if (next !== langRef.current) {
        langRef.current = next
        setLang(next)
        setT(getStrings(next))
      }
    }, 500)

    // Cross-tab changes
    function onStorage(e: StorageEvent) {
      if (e.key === 'hive_lang') {
        const next = e.newValue || 'en'
        langRef.current = next
        setLang(next)
        setT(getStrings(next))
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  function fmt(template: string, vars: Record<string, string | number>): string {
    return interpolate(template, vars)
  }

  function phase(englishPhase: string): string {
    return translatePhase(englishPhase, lang)
  }

  return { t, lang, fmt, phase }
}
