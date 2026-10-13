import { cx } from '../lib/format'

type Variant = 'primary' | 'outline' | 'light'
type Size = 'sm' | 'md'

const variants: Record<Variant, string> = {
  primary: 'bg-burgundy text-white hover:bg-burgundy-dark',
  outline: 'border border-charcoal/25 text-charcoal hover:border-charcoal/70',
  light: 'bg-cream text-charcoal hover:bg-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
}

/** Единый стиль кнопок — применяется и к <button>, и к ссылкам-кнопкам. */
export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cx(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45',
    variants[variant],
    sizes[size],
    className,
  )
