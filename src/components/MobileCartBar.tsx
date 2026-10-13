import { ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useI18n } from '../i18n'
import { formatPrice } from '../lib/format'

/** Закреплённая внизу экрана кнопка корзины — только на мобильных и когда в корзине что-то есть. */
export function MobileCartBar() {
  const { t } = useI18n()
  const { count, subtotal, open, isOpen } = useCart()
  if (count === 0 || isOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <button
        type="button"
        onClick={open}
        aria-label={t.cart.openWithCount(count)}
        className="flex h-14 w-full items-center justify-between rounded-full bg-burgundy px-5 text-white shadow-lg shadow-charcoal/15 transition-colors hover:bg-burgundy-dark"
      >
        <span className="flex items-center gap-2.5 font-medium">
          <ShoppingBag size={19} aria-hidden="true" />
          {t.cart.bar}
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white/20 px-1.5 text-xs font-semibold tabular-nums">
            {count}
          </span>
        </span>
        <span className="font-semibold tabular-nums">{formatPrice(subtotal, t.currency)}</span>
      </button>
    </div>
  )
}
