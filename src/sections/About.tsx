import about from '../assets/images/about-1280.jpg'
import aboutSmall from '../assets/images/about-720.jpg'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

export function About() {
  const { t } = useI18n()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="about" aria-labelledby="about-title" className="bg-surface py-16 sm:py-24">
      <div ref={ref} className="reveal container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="overflow-hidden rounded-[1.75rem] bg-soft">
          <img
            src={about}
            srcSet={`${aboutSmall} 720w, ${about} 1280w`}
            sizes="(min-width: 1024px) 46vw, 100vw"
            width={1280}
            height={848}
            alt={t.about.imageAlt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/5.2]"
          />
        </div>

        <div className="max-w-xl">
          <p className="eyebrow mb-4">{t.about.eyebrow}</p>
          <h2 id="about-title" className="font-display text-[2rem] leading-[1.1] sm:text-5xl">
            {t.about.title}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink/80 sm:text-lg">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
