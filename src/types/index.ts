/** Языки интерфейса. Чтобы добавить узбекский — допишите 'uz' и словарь в src/i18n. */
export type Locale = 'ru'

/** Текст с переводами. Русский обязателен, остальные языки — по мере добавления. */
export type LocalizedText = { ru: string } & Partial<Record<Locale, string>>

export type CategoryId = 'shashlik' | 'lula' | 'sides' | 'drinks'

export interface ResponsiveImage {
  /** Основной файл (крупный размер) */
  src: string
  /** Уменьшенная версия для мобильных */
  srcSmall: string
  /** Ширины файлов в пикселях: [small, large] */
  widths: [number, number]
}

export interface MenuItem {
  id: string
  category: CategoryId
  name: LocalizedText
  description: LocalizedText
  /** Порция: «1 шампур», «250 г» и т. п. */
  portion: LocalizedText
  /** Цена в сумах (UZS), целое число */
  price: number
  image: ResponsiveImage
}

export interface CartLine {
  item: MenuItem
  quantity: number
  lineTotal: number
}

export type FulfillmentMethod = 'delivery' | 'pickup'

export interface CustomerDetails {
  name: string
  phone: string
  method: FulfillmentMethod
  address: string
  comment: string
}

/** Данные заказа в том виде, в каком они уйдут в бэкенд / Telegram. */
export interface Order {
  items: { id: string; name: string; quantity: number; price: number; lineTotal: number }[]
  subtotal: number
  deliveryFee: number | null
  total: number
  currency: string
  customer: CustomerDetails
  createdAt: string
}
