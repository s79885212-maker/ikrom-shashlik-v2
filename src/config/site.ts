/**
 * Бренд и контакты ресторана.
 *
 * Пока реальные данные не предоставлены, поля контактов равны `null` —
 * на сайте вместо них показывается пометка «будет указано».
 * Заполните значения, и кнопки «Позвонить» / «Открыть карту» заработают сами.
 */
export interface SiteContacts {
  /** Адрес, например: 'г. Ташкент, ул. …, 12' */
  address: string | null
  /** Телефон в международном формате, например: '+998 90 123 45 67' */
  phone: string | null
  /** Часы работы, например: 'Ежедневно, 11:00 – 23:00' */
  hours: string | null
  /** Полная ссылка на Instagram: 'https://instagram.com/…' */
  instagramUrl: string | null
  /** Имя пользователя Telegram без @, например: 'ikromshashlik' */
  telegramUsername: string | null
  /** Ссылка на точку в Google Maps или Яндекс Картах */
  mapUrl: string | null
  /** Ссылка для встраивания карты (iframe src) из Google Maps / Яндекс Карт */
  mapEmbedUrl: string | null
}

export const site = {
  name: 'Ikrom Shashlik',
  currencyCode: 'UZS',
  /** Стоимость доставки в сумах. `null` — «уточняется при подтверждении». */
  deliveryFee: null as number | null,
  contacts: {
    address: null,
    phone: null,
    hours: null,
    instagramUrl: null,
    telegramUsername: null,
    mapUrl: null,
    mapEmbedUrl: null,
  } as SiteContacts,
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`
export const telegramHref = (username: string) => `https://t.me/${username.replace(/^@/, '')}`
