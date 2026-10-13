import { cx } from '../lib/format'

type Variant = 'primary' | 'outline' | 'light'
type Size = 'sm' | 'md'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  outline: 'border border-ink/25 text-ink hover:border-ink/70',
  light: 'bg-ground text-ink hover:bg-surface',
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
