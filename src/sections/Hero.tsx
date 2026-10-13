import { ArrowRight, Flame } from 'lucide-react'
import hero from '../assets/images/hero-1920.jpg'
import heroSmall from '../assets/images/hero-960.jpg'
import { buttonClass } from '../components/buttonClass'
import { useI18n } from '../i18n'

export function Hero({ onOrder }: { onOrder: () => void }) {
  const { t } = useI18n()

  return (
    <section id="home" aria-labelledby="hero-title" className="pt-16">
      <div className="container-page grid gap-10 pt-10 pb-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:pt-16 lg:pb-24">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="font-display text-[2.75rem] leading-[1.04] sm:text-6xl xl:text-[4.75rem]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted sm:text-xl">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
            <a href="#menu" className={buttonClass('primary', 'md', 'h-13 px-7')}>
              {t.hero.viewMenu}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <button type="button" onClick={onOrder} className={buttonClass('outline', 'md', 'h-13 px-7')}>
              {t.hero.orderNow}
            </button>
          </div>

          <p className="mt-9 flex items-center gap-2.5 text-sm text-charcoal/75">
            <Flame size={17} className="text-burgundy" aria-hidden="true" />
            {t.hero.note}
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] bg-beige lg:rounded-[2.25rem]">
          <img
            src={hero}
            srcSet={`${heroSmall} 960w, ${hero} 1920w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={1920}
            height={1280}
            alt={t.hero.imageAlt}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[5/6] xl:aspect-[1/1]"
          />
        </div>
      </div>
    </section>
  )
}
