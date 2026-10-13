import { Minus, Plus } from 'lucide-react'
import { cx } from '../lib/format'

interface Props {
  quantity: number
  onChange: (quantity: number) => void
  decreaseLabel: string
  increaseLabel: string
  quantityLabel: string
  className?: string
}

export function QuantityStepper({
  quantity,
  onChange,
  decreaseLabel,
  increaseLabel,
  quantityLabel,
  className,
}: Props) {
  const buttonClass =
    'grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-soft'

  return (
    <div
      className={cx(
        'inline-flex h-10 items-center justify-between rounded-full border border-ink/15 bg-surface',
        className,
      )}
    >
      <button type="button" className={buttonClass} aria-label={decreaseLabel} onClick={() => onChange(quantity - 1)}>
        <Minus size={16} aria-hidden="true" />
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums" aria-label={`${quantityLabel}: ${quantity}`}>
        {quantity}
      </span>
      <button type="button" className={buttonClass} aria-label={increaseLabel} onClick={() => onChange(quantity + 1)}>
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
