import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Locale, LocalizedText } from '../types'
import { ru, type Dictionary } from './ru'

/**
 * Чтобы добавить узбекский язык:
 * 1. расширьте тип `Locale` в src/types ('ru' | 'uz');
 * 2. создайте src/i18n/uz.ts с тем же набором ключей, что и ru.ts;
 * 3. зарегистрируйте словарь ниже и добавьте переводы `uz` в данные меню;
 * 4. вызывайте `setLocale` из переключателя языка.
 */
const dictionaries: Record<Locale, Dictionary> = { ru }

export const DEFAULT_LOCALE: Locale = 'ru'

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Словарь интерфейса для текущего языка */
  t: Dictionary
  /** Выбирает перевод из данных (меню и т. п.), с откатом на русский */
  tr: (text: LocalizedText) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      tr: (text) => text[locale] ?? text.ru,
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}
