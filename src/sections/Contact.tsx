import type { ReactNode } from 'react'
import { Camera, Clock, MapPin, Phone, Send } from 'lucide-react'
import { buttonClass } from '../components/buttonClass'
import { SectionHeading } from '../components/SectionHeading'
import { site, telegramHref, telHref } from '../config/site'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-t border-charcoal/10 py-4">
      <span className="mt-0.5 text-burgundy">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-0.5 text-[17px] break-words">{children}</dd>
      </div>
    </div>
  )
}

/** Пометка на месте данных, которые ресторан ещё не предоставил */
const Placeholder = ({ children }: { children: ReactNode }) => (
  <span className="text-charcoal/55 italic">{children}</span>
)

const linkClass = 'underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-burgundy'

export function Contact() {
  const { t } = useI18n()
  const c = t.contact
  const { address, phone, hours, instagramUrl, telegramUsername, mapUrl, mapEmbedUrl } = site.contacts
  const ref = useReveal<HTMLDivElement>()
  const iconProps = { size: 20, strokeWidth: 1.6, 'aria-hidden': true } as const

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-16 sm:py-24">
      <div ref={ref} className="reveal container-page grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

          <dl className="mt-8 border-b border-charcoal/10">
            <Row icon={<MapPin {...iconProps} />} label={c.address}>
              {address ?? <Placeholder>{c.placeholder.address}</Placeholder>}
            </Row>
            <Row icon={<Phone {...iconProps} />} label={c.phone}>
              {phone ? (
                <a href={telHref(phone)} className={linkClass}>
                  {phone}
                </a>
              ) : (
                <Placeholder>{c.placeholder.phone}</Placeholder>
              )}
            </Row>
            <Row icon={<Clock {...iconProps} />} label={c.hours}>
              {hours ?? <Placeholder>{c.placeholder.hours}</Placeholder>}
            </Row>
            <Row icon={<Camera {...iconProps} />} label={c.instagram}>
              {instagramUrl ? (
                <a href={instagramUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  {instagramUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </a>
              ) : (
                <Placeholder>{c.placeholder.instagram}</Placeholder>
              )}
            </Row>
            <Row icon={<Send {...iconProps} />} label={c.telegram}>
              {telegramUsername ? (
                <a href={telegramHref(telegramUsername)} target="_blank" rel="noreferrer" className={linkClass}>
                  @{telegramUsername.replace(/^@/, '')}
                </a>
              ) : (
                <Placeholder>{c.placeholder.telegram}</Placeholder>
              )}
            </Row>
          </dl>

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            {phone ? (
              <a href={telHref(phone)} className={buttonClass('primary')}>
                <Phone size={18} aria-hidden="true" />
                {c.call}
              </a>
            ) : (
              <button type="button" disabled aria-describedby="contact-hint" className={buttonClass('primary')}>
                <Phone size={18} aria-hidden="true" />
                {c.call}
              </button>
            )}
            {mapUrl ? (
              <a href={mapUrl} target="_blank" rel="noreferrer" className={buttonClass('outline')}>
                <MapPin size={18} aria-hidden="true" />
                {c.openMap}
              </a>
            ) : (
              <button type="button" disabled aria-describedby="contact-hint" className={buttonClass('outline')}>
                <MapPin size={18} aria-hidden="true" />
                {c.openMap}
              </button>
            )}
          </div>
          {(!phone || !mapUrl) && (
            <p id="contact-hint" className="mt-3 text-sm text-muted">
              {c.unavailableHint}
            </p>
          )}
        </div>

        <div className="min-h-72 overflow-hidden rounded-[1.75rem] bg-beige/60 lg:min-h-full">
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              title={c.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-72 border-0"
            />
          ) : (
            <div className="flex size-full min-h-72 flex-col items-center justify-center gap-3 border border-dashed border-charcoal/20 p-8 text-center rounded-[1.75rem]">
              <MapPin size={30} strokeWidth={1.4} className="text-burgundy" aria-hidden="true" />
              <p className="max-w-[16rem] text-charcoal/65">{c.mapPlaceholder}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
