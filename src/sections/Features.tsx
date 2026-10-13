import { Beef, Flame, HeartHandshake, Leaf } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

// Порядок иконок соответствует порядку t.features.items
const icons = [Leaf, Flame, Beef, HeartHandshake]

export function Features() {
  const { t } = useI18n()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section aria-labelledby="features-title" className="py-16 sm:py-24">
      <div ref={ref} className="reveal container-page">
        <SectionHeading id="features-title" title={t.features.title} />
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.features.items.map((feature, index) => {
            const Icon = icons[index]
            return (
              <li key={feature.title} className="border-t border-ink/15 pt-6">
                <Icon size={28} strokeWidth={1.4} className="text-accent" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{feature.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
