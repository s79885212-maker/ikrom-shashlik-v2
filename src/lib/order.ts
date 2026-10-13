import type { Order } from '../types'
import { formatPrice } from './format'

/**
 * Точка подключения отправки заказов.
 *
 * Сейчас интеграции нет: без переменной окружения VITE_ORDER_ENDPOINT функция
 * честно возвращает `not_configured`, и сайт сообщает гостю, что заказ не отправлен.
 *
 * Чтобы подключить приём заказов (бэкенд, вебхук, сервис-прослойка для Telegram-бота),
 * укажите адрес в файле .env:  VITE_ORDER_ENDPOINT=https://…
 * На этот адрес уйдёт POST с JSON в формате `Order`.
 *
 * Важно: не вызывайте Telegram Bot API прямо из браузера — токен бота окажется
 * в открытом коде страницы. Используйте серверную прослойку.
 */
export type SubmitResult = { status: 'sent' } | { status: 'not_configured' }

const ORDER_ENDPOINT: string | undefined = import.meta.env.VITE_ORDER_ENDPOINT

export async function submitOrder(order: Order): Promise<SubmitResult> {
  if (!ORDER_ENDPOINT) return { status: 'not_configured' }

  const response = await fetch(ORDER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  if (!response.ok) throw new Error(`Order request failed: ${response.status}`)
  return { status: 'sent' }
}

interface OrderTextLabels {
  brand: string
  currency: string
  total: string
  delivery: string
  pickup: string
  name: string
  phone: string
  comment: string
}

/** Текстовая версия заказа — для копирования и отправки в мессенджер. */
export function formatOrderText(order: Order, labels: OrderTextLabels) {
  const { customer } = order
  const lines = [
    `${labels.brand} — заказ`,
    '',
    ...order.items.map(
      (line) => `• ${line.name} × ${line.quantity} — ${formatPrice(line.lineTotal, labels.currency)}`,
    ),
    '',
    `${labels.total}: ${formatPrice(order.total, labels.currency)}`,
    customer.method === 'delivery' ? `${labels.delivery}: ${customer.address}` : labels.pickup,
    `${labels.name}: ${customer.name}`,
    `${labels.phone}: ${customer.phone}`,
  ]
  if (customer.comment) lines.push(`${labels.comment}: ${customer.comment}`)
  return lines.join('\n')
}
