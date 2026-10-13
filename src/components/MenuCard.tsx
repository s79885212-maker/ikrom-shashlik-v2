import { Plus } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useI18n } from '../i18n'
import { formatPrice } from '../lib/format'
import type { MenuItem } from '../types'
import { buttonClass } from './buttonClass'
import { QuantityStepper } from './QuantityStepper'

interface Props {
  item: MenuItem
  onAdded: (name: string) => void
}

export function MenuCard({ item, onAdded }: Props) {
  const { t, tr } = useI18n()
  const { quantityOf, add, setQuantity } = useCart()
  const quantity = quantityOf(item.id)
  const name = tr(item.name)
  const [smallWidth, largeWidth] = item.image.widths

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl bg-surface">
      <div className="aspect-[4/3] overflow-hidden bg-soft">
        <img
          src={item.image.src}
          srcSet={`${item.image.srcSmall} ${smallWidth}w, ${item.image.src} ${largeWidth}w`}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 31vw, 46vw"
          width={largeWidth}
          height={Math.round((largeWidth * 3) / 4)}
          alt={name}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="text-[15px] leading-snug font-semibold sm:text-lg">{name}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-sm">{tr(item.description)}</p>

        <div className="mt-auto flex flex-col gap-3 pt-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between md:flex-col md:items-stretch lg:flex-row lg:items-center">
          <p className="leading-tight">
            <span className="block font-semibold whitespace-nowrap">{formatPrice(item.price, t.currency)}</span>
            <span className="text-xs text-muted">{tr(item.portion)}</span>
          </p>

          {quantity > 0 ? (
            <QuantityStepper
              quantity={quantity}
              onChange={(next) => setQuantity(item.id, next)}
              decreaseLabel={t.cart.decrease(name)}
              increaseLabel={t.cart.increase(name)}
              quantityLabel={t.cart.quantity}
              className="min-[480px]:w-28 md:w-auto lg:w-28"
            />
          ) : (
            <button
              type="button"
              className={buttonClass('primary', 'sm')}
              aria-label={t.menu.addAria(name)}
              onClick={() => {
                add(item.id)
                onAdded(name)
              }}
            >
              <Plus size={16} aria-hidden="true" />
              {t.menu.add}
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
