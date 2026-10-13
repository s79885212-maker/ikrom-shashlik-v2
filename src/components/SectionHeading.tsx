import { cx } from '../lib/format'

interface Props {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = 'left' }: Props) {
  return (
    <div className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="font-display text-[2rem] leading-[1.1] sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
    </div>
  )
}
