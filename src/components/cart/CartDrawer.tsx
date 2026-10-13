import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, LoaderCircle, ShoppingBag, X } from 'lucide-react'
import { site } from '../../config/site'
import { useCart } from '../../hooks/useCart'
import { useI18n } from '../../i18n'
import { cx, formatPrice } from '../../lib/format'
import { formatOrderText, submitOrder } from '../../lib/order'
import { validateCustomer, type CustomerErrors, type CustomerField } from '../../lib/validation'
import type { CustomerDetails, Order } from '../../types'
import { buttonClass } from '../buttonClass'
import { CartItems } from './CartItems'
import { fieldId, OrderForm } from './OrderForm'
import { OrderResult, type OrderOutcome } from './OrderResult'

type Step = 'cart' | 'details' | 'review' | 'result'

const emptyCustomer: CustomerDetails = { name: '', phone: '', method: 'delivery', address: '', comment: '' }
const fieldOrder: CustomerField[] = ['name', 'phone', 'address']

export function CartDrawer() {
  const { t, tr } = useI18n()
  const cart = useCart()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const [step, setStep] = useState<Step>('cart')
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer)
  const [errors, setErrors] = useState<CustomerErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [outcome, setOutcome] = useState<OrderOutcome | null>(null)

  // Синхронизация состояния корзины с нативным <dialog>: он сам удерживает фокус и закрывается по Esc
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (cart.isOpen && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!cart.isOpen && dialog.open) {
      dialog.close()
    }
    if (!cart.isOpen) document.body.style.overflow = ''
  }, [cart.isOpen])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const goTo = (next: Step) => {
    setStep(next)
    dialogRef.current?.querySelector('[data-scroll]')?.scrollTo({ top: 0 })
  }

  const handleClose = () => {
    cart.close()
    // После результата следующее открытие начинается с корзины
    if (step === 'result') {
      setStep('cart')
      setOutcome(null)
    }
  }

  const deliveryFee = customer.method === 'delivery' ? site.deliveryFee : 0
  const total = cart.subtotal + (deliveryFee ?? 0)
  const price = (amount: number) => formatPrice(amount, t.currency)
  const deliveryLabel =
    customer.method === 'pickup'
      ? t.cart.pickup
      : deliveryFee === null
        ? t.cart.deliveryTbd
        : deliveryFee === 0
          ? t.cart.deliveryFree
          : price(deliveryFee)

  const handleDetailsSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateCustomer(customer)
    setErrors(nextErrors)
    const firstInvalid = fieldOrder.find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }
    goTo('review')
  }

  const buildOrder = (): Order => ({
    items: cart.lines.map(({ item, quantity, lineTotal }) => ({
      id: item.id,
      name: tr(item.name),
      quantity,
      price: item.price,
      lineTotal,
    })),
    subtotal: cart.subtotal,
    deliveryFee,
    total,
    currency: site.currencyCode,
    customer: {
      ...customer,
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.method === 'delivery' ? customer.address.trim() : '',
      comment: customer.comment.trim(),
    },
    createdAt: new Date().toISOString(),
  })

  const handleSubmit = async () => {
    if (submitting || cart.lines.length === 0) return
    const order = buildOrder()
    setSubmitting(true)
    try {
      const result = await submitOrder(order)
      if (result.status === 'sent') {
        cart.clear()
        setOutcome({ kind: 'sent' })
      } else {
        setOutcome({
          kind: 'prepared',
          orderText: formatOrderText(order, {
            brand: site.name,
            currency: t.currency,
            total: t.cart.total,
            delivery: t.form.delivery,
            pickup: t.form.pickup,
            name: t.form.name,
            phone: t.form.phone,
            comment: t.review.comment,
          }),
        })
      }
    } catch {
      setOutcome({ kind: 'error' })
    } finally {
      setSubmitting(false)
      goTo('result')
    }
  }

  const isEmpty = cart.lines.length === 0
  const activeStep: Step = isEmpty && step !== 'result' ? 'cart' : step
  const title =
    activeStep === 'details' ? t.form.title : activeStep === 'review' ? t.review.title : t.cart.title
  const steps = [
    { id: 'cart', label: t.steps.cart },
    { id: 'details', label: t.steps.details },
    { id: 'review', label: t.steps.review },
  ] as const
  const stepIndex = steps.findIndex((item) => item.id === activeStep)

  const backButton = (to: Step) => (
    <button type="button" onClick={() => goTo(to)} className={buttonClass('outline', 'md', 'px-4')} disabled={submitting}>
      <ArrowLeft size={18} aria-hidden="true" />
      {t.form.back}
    </button>
  )

  const summaryRow = (label: string, value: string, strong = false) => (
    <div className={cx('flex items-baseline justify-between gap-4', strong ? 'text-lg font-semibold' : 'text-[15px] text-ink/80')}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  )

  const footerClass = 'border-t border-ink/10 bg-ground px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-7'
  const bodyClass = 'flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7'

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      onClose={handleClose}
      onClick={(event) => event.target === dialogRef.current && handleClose()}
      className="cart-dialog fixed inset-0 m-0 ml-auto h-dvh max-h-none w-full max-w-none bg-ground text-ink sm:max-w-[28rem]"
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-ink/10 px-5 pt-4 pb-4 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <h2 id="cart-title" ref={headingRef} tabIndex={-1} className="font-display text-2xl outline-none">
              {title}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label={t.cart.close}
              className="-mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-soft"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {stepIndex >= 0 && !isEmpty && (
            <ol aria-label={t.steps.label} className="mt-3 flex items-center gap-2 text-xs">
              {steps.map((item, index) => (
                <li
                  key={item.id}
                  aria-current={index === stepIndex ? 'step' : undefined}
                  className={cx('flex flex-1 flex-col gap-1.5', index <= stepIndex ? 'text-ink' : 'text-ink/45')}
                >
                  <span className={cx('h-0.5 rounded-full', index <= stepIndex ? 'bg-accent' : 'bg-ink/15')} />
                  <span className={index === stepIndex ? 'font-semibold' : undefined}>{item.label}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        {activeStep === 'cart' &&
          (isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-soft text-accent">
                <ShoppingBag size={26} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="mt-5 text-lg font-semibold">{t.cart.emptyTitle}</p>
              <p className="mt-1.5 max-w-xs text-muted">{t.cart.emptyText}</p>
              <a href="#menu" onClick={handleClose} className={buttonClass('primary', 'md', 'mt-6')}>
                {t.cart.toMenu}
              </a>
            </div>
          ) : (
            <>
              <div data-scroll className={bodyClass}>
                <CartItems />
              </div>
              <div className={footerClass}>
                <dl className="mb-4">{summaryRow(t.cart.subtotal, price(cart.subtotal), true)}</dl>
                <button type="button" onClick={() => goTo('details')} className={buttonClass('primary', 'md', 'w-full')}>
                  {t.cart.checkout}
                </button>
              </div>
            </>
          ))}

        {activeStep === 'details' && (
          <form noValidate onSubmit={handleDetailsSubmit} className="flex min-h-0 flex-1 flex-col">
            <div data-scroll className={bodyClass}>
              {Object.keys(errors).length > 0 && (
                <p role="alert" className="mb-5 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {t.form.errorSummary}
                </p>
              )}
              <OrderForm
                customer={customer}
                errors={errors}
                onChange={(patch) => {
                  setCustomer((current) => ({ ...current, ...patch }))
                  // Ошибка поля исчезает, как только гость начинает его исправлять
                  setErrors((current) => {
                    const next = { ...current }
                    for (const key of Object.keys(patch)) delete next[key as CustomerField]
                    if (patch.method === 'pickup') delete next.address
                    return next
                  })
                }}
              />
            </div>
            <div className={cx(footerClass, 'flex gap-2')}>
              {backButton('cart')}
              <button type="submit" className={buttonClass('primary', 'md', 'flex-1')}>
                {t.form.next}
              </button>
            </div>
          </form>
        )}

        {activeStep === 'review' && (
          <>
            <div data-scroll className={cx(bodyClass, 'flex flex-col gap-6')}>
              <section aria-labelledby="review-items">
                <h3 id="review-items" className="eyebrow mb-3">
                  {t.review.items}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {cart.lines.map(({ item, quantity, lineTotal }) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 text-[15px]">
                      <span>
                        {tr(item.name)} <span className="text-muted">× {quantity}</span>
                      </span>
                      <span className="font-medium whitespace-nowrap tabular-nums">{price(lineTotal)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="review-contact" className="border-t border-ink/10 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 id="review-contact" className="eyebrow">
                    {t.review.contact}
                  </h3>
                  <button type="button" onClick={() => goTo('details')} className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                    {t.review.edit}
                  </button>
                </div>
                <dl className="flex flex-col gap-2 text-[15px]">
                  <div>
                    <dt className="sr-only">{t.form.name}</dt>
                    <dd className="break-words">{customer.name.trim()}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{t.form.phone}</dt>
                    <dd>{customer.phone.trim()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">{t.review.fulfillment}</dt>
                    <dd className="break-words">
                      {customer.method === 'delivery' ? `${t.form.delivery}: ${customer.address.trim()}` : t.form.pickup}
                    </dd>
                  </div>
                  {customer.comment.trim() && (
                    <div>
                      <dt className="text-sm text-muted">{t.review.comment}</dt>
                      <dd className="break-words whitespace-pre-wrap">{customer.comment.trim()}</dd>
                    </div>
                  )}
                </dl>
              </section>
            </div>
            <div className={footerClass}>
              <dl className="mb-4 flex flex-col gap-1.5">
                {summaryRow(t.cart.subtotal, price(cart.subtotal))}
                {summaryRow(t.cart.delivery, deliveryLabel)}
                {summaryRow(t.cart.total, price(total), true)}
              </dl>
              <div className="flex gap-2">
                {backButton('details')}
                <button type="button" onClick={handleSubmit} disabled={submitting} className={buttonClass('primary', 'md', 'flex-1')}>
                  {submitting && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
                  <span aria-live="polite">{submitting ? t.review.submitting : t.review.submit}</span>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-muted">{t.review.disclaimer}</p>
            </div>
          </>
        )}

        {activeStep === 'result' && outcome && (
          <>
            <div data-scroll className={bodyClass}>
              <OrderResult outcome={outcome} />
            </div>
            <div className={cx(footerClass, 'flex flex-col gap-2')}>
              {outcome.kind === 'error' && (
                <button
                  type="button"
                  onClick={() => {
                    setOutcome(null)
                    goTo('review')
                  }}
                  className={buttonClass('primary', 'md', 'w-full')}
                >
                  {t.result.retry}
                </button>
              )}
              <button type="button" onClick={handleClose} className={buttonClass('outline', 'md', 'w-full')}>
                {t.result.done}
              </button>
              {outcome.kind === 'prepared' && (
                <button
                  type="button"
                  onClick={() => {
                    cart.clear()
                    handleClose()
                  }}
                  className="h-10 text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
                >
                  {t.result.clearAndClose}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
