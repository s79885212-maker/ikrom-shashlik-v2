import { navLinks } from '../config/navigation'
import { site, telegramHref, telHref } from '../config/site'
import { photoCredits } from '../data/photoCredits'
import { useI18n } from '../i18n'

const linkClass = 'text-cream/75 transition-colors hover:text-white'

export function Footer() {
  const { t } = useI18n()
  const { address, phone, hours, instagramUrl, telegramUsername } = site.contacts
  const hasContacts = address || phone || hours
  const hasSocial = instagramUrl || telegramUsername

  return (
    <footer className="bg-charcoal pt-14 pb-28 text-cream md:pb-10">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <a href="#home" className="font-display text-2xl">
              {site.name}
            </a>
            <p className="mt-4 leading-relaxed text-cream/70">{t.footer.description}</p>
          </div>

          <nav aria-label={t.footer.navigation}>
            <h2 className="text-sm font-semibold tracking-wide text-cream/50 uppercase">{t.footer.navigation}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-cream/50 uppercase">{t.footer.contacts}</h2>
            {hasContacts ? (
              <ul className="mt-4 flex flex-col gap-2.5 text-cream/75">
                {address && <li>{address}</li>}
                {phone && (
                  <li>
                    <a href={telHref(phone)} className={linkClass}>
                      {phone}
                    </a>
                  </li>
                )}
                {hours && <li>{hours}</li>}
              </ul>
            ) : (
              <p className="mt-4 text-cream/55 italic">{t.footer.contactsEmpty}</p>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-cream/50 uppercase">{t.footer.social}</h2>
            {hasSocial ? (
              <ul className="mt-4 flex flex-col gap-2.5">
                {instagramUrl && (
                  <li>
                    <a href={instagramUrl} target="_blank" rel="noreferrer" className={linkClass}>
                      {t.contact.instagram}
                    </a>
                  </li>
                )}
                {telegramUsername && (
                  <li>
                    <a href={telegramHref(telegramUsername)} target="_blank" rel="noreferrer" className={linkClass}>
                      {t.contact.telegram}
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-4 text-cream/55 italic">{t.footer.socialEmpty}</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/15 pt-6 text-sm text-cream/55 sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          {photoCredits.length > 0 && (
            <details className="sm:max-w-md sm:text-right">
              <summary className="cursor-pointer transition-colors hover:text-cream">{t.footer.photoCredits}</summary>
              <ul className="mt-3 flex flex-col gap-1 text-xs leading-relaxed">
                {photoCredits.map((credit) => (
                  <li key={credit.url}>
                    {credit.subject} —{' '}
                    <a href={credit.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-cream">
                      {credit.author}
                    </a>
                    , {credit.license}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </footer>
  )
}
