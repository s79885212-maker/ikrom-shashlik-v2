import { useState } from 'react'
import { Check, CircleAlert, Copy, Info, Phone, Send } from 'lucide-react'
import { site, telegramHref, telHref } from '../../config/site'
import { useI18n } from '../../i18n'
import { buttonClass } from '../buttonClass'

export type OrderOutcome =
  | { kind: 'sent' }
  | { kind: 'prepared'; orderText: string }
  | { kind: 'error' }

export function OrderResult({ outcome }: { outcome: OrderOutcome }) {
  const { t } = useI18n()
  const r = t.result
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  if (outcome.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-burgundy text-white">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl">{r.sentTitle}</h3>
        <p className="mt-2 max-w-xs text-muted">{r.sentText}</p>
      </div>
    )
  }

  if (outcome.kind === 'error') {
    return (
      <div role="alert" className="flex flex-col items-center py-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-red-800/10 text-red-800">
          <CircleAlert size={26} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl">{r.errorTitle}</h3>
        <p className="mt-2 max-w-xs text-muted">{r.errorText}</p>
      </div>
    )
  }

  const { phone, telegramUsername } = site.contacts
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(outcome.orderText)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <div>
      <div role="status" className="flex gap-3 rounded-2xl bg-beige/70 p-4">
        <Info size={20} className="mt-0.5 shrink-0 text-burgundy" aria-hidden="true" />
        <div>
          <h3 className="font-semibold">{r.preparedTitle}</h3>
          <p className="mt-1 text-sm leading-relaxed text-charcoal/80">{r.preparedText}</p>
        </div>
      </div>

      <h4 className="mt-6 mb-2 text-sm font-medium">{r.orderText}</h4>
      <pre
        tabIndex={0}
        className="max-h-64 overflow-auto rounded-xl border border-charcoal/10 bg-white p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap select-all"
      >
        {outcome.orderText}
      </pre>

      <div className="mt-4 flex flex-col gap-2">
        <button type="button" onClick={copy} className={buttonClass('primary', 'md', 'w-full')}>
          {copyState === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copyState === 'copied' ? r.copied : r.copy}
        </button>
        {telegramUsername && (
          <a
            href={`${telegramHref(telegramUsername)}?text=${encodeURIComponent(outcome.orderText)}`}
            target="_blank"
            rel="noreferrer"
            className={buttonClass('outline', 'md', 'w-full')}
          >
            <Send size={18} aria-hidden="true" />
            {r.sendTelegram}
          </a>
        )}
        {phone && (
          <a href={telHref(phone)} className={buttonClass('outline', 'md', 'w-full')}>
            <Phone size={18} aria-hidden="true" />
            {r.call}
          </a>
        )}
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-sm text-red-800">
        {copyState === 'failed' ? r.copyFailed : ''}
      </p>
    </div>
  )
}
