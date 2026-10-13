import { useState } from 'react'
import { MenuCard } from '../components/MenuCard'
import { SectionHeading } from '../components/SectionHeading'
import { categories, menu } from '../data/menu'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'
import { cx } from '../lib/format'
import type { CategoryId } from '../types'

type Filter = CategoryId | 'all'

export function MenuSection() {
  const { t, tr } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [announcement, setAnnouncement] = useState('')
  const headingRef = useReveal<HTMLDivElement>()

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t.menu.all },
    ...categories.map((category) => ({ id: category.id, label: tr(category.label) })),
  ]
  const items = filter === 'all' ? menu : menu.filter((item) => item.category === filter)

  return (
    <section id="menu" aria-labelledby="menu-title" className="border-t border-ink/10 py-16 sm:py-24">
      <div className="container-page">
        <div ref={headingRef} className="reveal">
          <SectionHeading id="menu-title" title={t.menu.title} subtitle={t.menu.subtitle} />
        </div>

        {/* На узких экранах фильтры прокручиваются по горизонтали внутри своей строки */}
        <div className="no-scrollbar -mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul aria-label={t.menu.filtersLabel} className="flex w-max gap-2 py-1">
            {filters.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                  className={cx(
                    'h-11 rounded-full border px-5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200',
                    filter === item.id
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-ink/15 text-ink hover:border-ink/50',
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {items.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} onAdded={(name) => setAnnouncement(t.cart.added(name))} />
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-muted">{t.menu.empty}</p>
        )}

        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </section>
  )
}
