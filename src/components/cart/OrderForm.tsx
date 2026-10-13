import type { ReactNode } from 'react'
import { Store, Truck } from 'lucide-react'
import { useI18n } from '../../i18n'
import { cx } from '../../lib/format'
import type { CustomerErrors, CustomerField } from '../../lib/validation'
import type { CustomerDetails, FulfillmentMethod } from '../../types'

interface Props {
  customer: CustomerDetails
  errors: CustomerErrors
  onChange: (patch: Partial<CustomerDetails>) => void
}

const inputClass = (invalid: boolean) =>
  cx(
    'w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40',
    'transition-colors focus:border-burgundy focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-burgundy/20',
    invalid ? 'border-red-700' : 'border-charcoal/15',
  )

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium">
        {label}
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  )
}

export const fieldId = (field: CustomerField) => `order-${field}`

export function OrderForm({ customer, errors, onChange }: Props) {
  const { t } = useI18n()
  const f = t.form
  const errorText = (field: CustomerField) => {
    const key = errors[field]
    return key ? f.errors[key] : undefined
  }
  const aria = (field: CustomerField) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${fieldId(field)}-error` : undefined,
  })

  const methods: { value: FulfillmentMethod; label: string; icon: ReactNode }[] = [
    { value: 'delivery', label: f.delivery, icon: <Truck size={18} aria-hidden="true" /> },
    { value: 'pickup', label: f.pickup, icon: <Store size={18} aria-hidden="true" /> },
  ]

  return (
    <div className="flex flex-col gap-5">
      <Field id={fieldId('name')} label={f.name} error={errorText('name')}>
        <input
          id={fieldId('name')}
          type="text"
          autoComplete="name"
          required
          maxLength={60}
          value={customer.name}
          placeholder={f.namePlaceholder}
          onChange={(event) => onChange({ name: event.target.value })}
          className={inputClass(!!errors.name)}
          {...aria('name')}
        />
      </Field>

      <Field id={fieldId('phone')} label={f.phone} error={errorText('phone')}>
        <input
          id={fieldId('phone')}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={24}
          value={customer.phone}
          placeholder={f.phonePlaceholder}
          onChange={(event) => onChange({ phone: event.target.value })}
          className={inputClass(!!errors.phone)}
          {...aria('phone')}
        />
      </Field>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">{f.method}</legend>
        <div className="grid grid-cols-2 gap-2">
          {methods.map((method) => (
            <label
              key={method.value}
              className={cx(
                'flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border text-[15px] font-medium transition-colors',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy',
                customer.method === method.value
                  ? 'border-burgundy bg-burgundy text-white'
                  : 'border-charcoal/15 bg-white hover:border-charcoal/40',
              )}
            >
              <input
                type="radio"
                name="order-method"
                value={method.value}
                checked={customer.method === method.value}
                onChange={() => onChange({ method: method.value })}
                className="sr-only"
              />
              {method.icon}
              {method.label}
            </label>
          ))}
        </div>
      </fieldset>

      {customer.method === 'delivery' && (
        <Field id={fieldId('address')} label={f.address} error={errorText('address')}>
          <input
            id={fieldId('address')}
            type="text"
            autoComplete="street-address"
            required
            maxLength={160}
            value={customer.address}
            placeholder={f.addressPlaceholder}
            onChange={(event) => onChange({ address: event.target.value })}
            className={inputClass(!!errors.address)}
            {...aria('address')}
          />
        </Field>
      )}

      <Field id="order-comment" label={f.comment} hint={f.optional}>
        <textarea
          id="order-comment"
          rows={3}
          maxLength={300}
          value={customer.comment}
          placeholder={f.commentPlaceholder}
          onChange={(event) => onChange({ comment: event.target.value })}
          className={cx(inputClass(false), 'resize-none')}
        />
      </Field>
    </div>
  )
}
