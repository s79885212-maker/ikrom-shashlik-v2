import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { navLinks } from '../config/navigation'
import { useCart } from '../hooks/useCart'
import { useI18n } from '../i18n'
import { cx } from '../lib/format'
import { buttonClass } from './buttonClass'
import { Logo } from './Logo'

export function Header({ onOrder }: { onOrder: () => void }) {
  const { t } = useI18n()
  const { count, open } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300',
        menuOpen ? 'bg-ground' : 'bg-ground/95 backdrop-blur-sm',
        scrolled || menuOpen ? 'border-ink/10' : 'border-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo onClick={() => setMenuOpen(false)} />

        <nav aria-label={t.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-8 text-[15px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="py-2 text-ink/80 transition-colors hover:text-accent">
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={open}
            aria-label={count > 0 ? t.cart.openWithCount(count) : t.cart.open}
            className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-soft"
          >
            <ShoppingBag size={21} strokeWidth={1.75} aria-hidden="true" />
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[11px] leading-none font-semibold text-on-accent tabular-nums"
              >
                {count}
              </span>
            )}
          </button>
          {/* На самых узких экранах кнопка «Заказать» живёт в раскрывающемся меню */}
          <div className="ml-1 hidden min-[480px]:block">
            <button type="button" onClick={onOrder} className={buttonClass('primary', 'sm')}>
              {t.nav.order}
            </button>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-soft md:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label={t.nav.label} hidden={!menuOpen} className="border-t border-ink/10 md:hidden">
        <ul className="container-page flex flex-col py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block py-3 text-lg" onClick={() => setMenuOpen(false)}>
                {t.nav[link.key]}
              </a>
            </li>
          ))}
          <li className="pt-3 pb-2">
            <button
              type="button"
              className={buttonClass('primary', 'md', 'w-full')}
              onClick={() => {
                setMenuOpen(false)
                onOrder()
              }}
            >
              {t.nav.order}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
