import { Trash2 } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { useI18n } from '../../i18n'
import { formatPrice } from '../../lib/format'
import { QuantityStepper } from '../QuantityStepper'

export function CartItems() {
  const { t, tr } = useI18n()
  const { lines, setQuantity, remove } = useCart()

  return (
    <ul className="divide-y divide-ink/10">
      {lines.map(({ item, quantity, lineTotal }) => {
        const name = tr(item.name)
        return (
          <li key={item.id} className="flex gap-4 py-4 first:pt-0">
            <img
              src={item.image.srcSmall}
              alt=""
              width={72}
              height={72}
              loading="lazy"
              className="size-[72px] shrink-0 rounded-xl bg-soft object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="leading-snug font-medium">{name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {formatPrice(item.price, t.currency)} · {tr(item.portion)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={t.cart.remove(name)}
                  className="-mt-2 -mr-2 grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-accent"
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <QuantityStepper
                  quantity={quantity}
                  onChange={(next) => setQuantity(item.id, next)}
                  decreaseLabel={t.cart.decrease(name)}
                  increaseLabel={t.cart.increase(name)}
                  quantityLabel={t.cart.quantity}
                  className="w-28"
                />
                <p className="font-semibold whitespace-nowrap tabular-nums">{formatPrice(lineTotal, t.currency)}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
