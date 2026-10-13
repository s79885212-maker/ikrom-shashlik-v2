import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { menuById } from '../data/menu'
import type { CartLine } from '../types'

const STORAGE_KEY = 'ikrom-shashlik:cart'
const MAX_QUANTITY = 99

type Quantities = Record<string, number>

interface CartValue {
  lines: CartLine[]
  count: number
  subtotal: number
  quantityOf: (id: string) => number
  add: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
}

const CartContext = createContext<CartValue | null>(null)

function loadQuantities(): Quantities {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!parsed || typeof parsed !== 'object') return {}
    const result: Quantities = {}
    for (const [id, quantity] of Object.entries(parsed)) {
      // Отбрасываем блюда, которых больше нет в меню, и некорректные значения
      if (menuById.has(id) && Number.isInteger(quantity) && quantity > 0) {
        result[id] = Math.min(quantity, MAX_QUANTITY)
      }
    }
    return result
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>(loadQuantities)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
    } catch {
      // Хранилище недоступно (приватный режим) — корзина просто не сохранится
    }
  }, [quantities])

  const setQuantity = useCallback((id: string, quantity: number) => {
    setQuantities((current) => {
      const next = { ...current }
      if (quantity <= 0) delete next[id]
      else next[id] = Math.min(Math.floor(quantity), MAX_QUANTITY)
      return next
    })
  }, [])

  const add = useCallback((id: string) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.min((current[id] ?? 0) + 1, MAX_QUANTITY),
    }))
  }, [])

  const remove = useCallback((id: string) => setQuantity(id, 0), [setQuantity])
  const clear = useCallback(() => setQuantities({}), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartValue>(() => {
    const lines: CartLine[] = []
    for (const [id, quantity] of Object.entries(quantities)) {
      const item = menuById.get(id)
      if (item) lines.push({ item, quantity, lineTotal: item.price * quantity })
    }
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      quantityOf: (id) => quantities[id] ?? 0,
      add,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
    }
  }, [quantities, isOpen, add, setQuantity, remove, clear, open, close])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside <CartProvider>')
  return value
}
