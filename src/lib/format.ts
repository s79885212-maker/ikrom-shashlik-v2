const numberFormat = new Intl.NumberFormat('ru-RU')

/** 22000 → «22 000 сум» */
export const formatPrice = (amount: number, currencyLabel: string) =>
  `${numberFormat.format(amount)} ${currencyLabel}`

export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')
