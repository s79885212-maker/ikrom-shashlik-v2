import logo from '../assets/images/logo.jpg'
import { site } from '../config/site'
import { cx } from '../lib/format'

interface Props {
  onClick?: () => void
  /** Размер эмблемы и надписи: в шапке компактнее, в подвале крупнее */
  size?: 'md' | 'lg'
  className?: string
}

export function Logo({ onClick, size = 'md', className }: Props) {
  const pixels = size === 'lg' ? 56 : 44

  return (
    <a href="#home" onClick={onClick} className={cx('inline-flex items-center gap-3', className)}>
      {/* Название читается из текста рядом, поэтому сама эмблема декоративна */}
      <img
        src={logo}
        alt=""
        width={pixels}
        height={pixels}
        decoding="async"
        className={cx('shrink-0 rounded-full object-cover', size === 'lg' ? 'size-14' : 'size-11')}
      />
      <span className={cx('font-display tracking-tight whitespace-nowrap', size === 'lg' ? 'text-2xl' : 'text-xl sm:text-[1.4rem]')}>
        {site.name}
      </span>
    </a>
  )
}
