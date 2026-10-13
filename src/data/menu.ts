/**
 * Меню ресторана. Все названия, описания и цены редактируются здесь.
 * Цены указаны в сумах (UZS) и являются примерными — замените на актуальные.
 */
import type { CategoryId, LocalizedText, MenuItem, ResponsiveImage } from '../types'

import lamb from '../assets/images/lamb-880.jpg'
import lambSm from '../assets/images/lamb-440.jpg'
import beef from '../assets/images/beef-880.jpg'
import beefSm from '../assets/images/beef-440.jpg'
import chicken from '../assets/images/chicken-880.jpg'
import chickenSm from '../assets/images/chicken-440.jpg'
import lula from '../assets/images/lula-880.jpg'
import lulaSm from '../assets/images/lula-440.jpg'
import potato from '../assets/images/potato-880.jpg'
import potatoSm from '../assets/images/potato-440.jpg'
import vegetables from '../assets/images/vegetables-880.jpg'
import vegetablesSm from '../assets/images/vegetables-440.jpg'
import salad from '../assets/images/salad-880.jpg'
import saladSm from '../assets/images/salad-440.jpg'
import tea from '../assets/images/tea-880.jpg'
import teaSm from '../assets/images/tea-440.jpg'

const img = (src: string, srcSmall: string): ResponsiveImage => ({
  src,
  srcSmall,
  widths: [440, 880],
})

export const categories: { id: CategoryId; label: LocalizedText }[] = [
  { id: 'shashlik', label: { ru: 'Шашлык' } },
  { id: 'lula', label: { ru: 'Люля-кебаб' } },
  { id: 'sides', label: { ru: 'Гарниры' } },
  { id: 'drinks', label: { ru: 'Напитки' } },
]

export const menu: MenuItem[] = [
  {
    id: 'lamb-shashlik',
    category: 'shashlik',
    name: { ru: 'Шашлык из баранины' },
    description: { ru: 'Нежная баранина в традиционном маринаде, с луком и зеленью.' },
    portion: { ru: '1 шампур' },
    price: 22000,
    image: img(lamb, lambSm),
  },
  {
    id: 'beef-shashlik',
    category: 'shashlik',
    name: { ru: 'Шашлык из говядины' },
    description: { ru: 'Сочная говядина крупными кусками, обжаренная на углях.' },
    portion: { ru: '1 шампур' },
    price: 20000,
    image: img(beef, beefSm),
  },
  {
    id: 'chicken-shashlik',
    category: 'shashlik',
    name: { ru: 'Шашлык из курицы' },
    description: { ru: 'Куриное филе со сладким перцем и лёгкими специями.' },
    portion: { ru: '1 шампур' },
    price: 16000,
    image: img(chicken, chickenSm),
  },
  {
    id: 'lula-kebab',
    category: 'lula',
    name: { ru: 'Люля-кебаб' },
    description: { ru: 'Рубленое мясо со специями, маринованным луком и лепёшкой.' },
    portion: { ru: '1 шампур' },
    price: 18000,
    image: img(lula, lulaSm),
  },
  {
    id: 'ink-potato',
    category: 'sides',
    name: { ru: 'Картофель на углях' },
    description: { ru: 'Запечённый картофель с золотистой корочкой и укропом.' },
    portion: { ru: '200 г' },
    price: 12000,
    image: img(potato, potatoSm),
  },
  {
    id: 'grilled-vegetables',
    category: 'sides',
    name: { ru: 'Овощи на гриле' },
    description: { ru: 'Кабачки, перец и помидоры с дымком и свежей зеленью.' },
    portion: { ru: '250 г' },
    price: 15000,
    image: img(vegetables, vegetablesSm),
  },
  {
    id: 'fresh-salad',
    category: 'sides',
    name: { ru: 'Свежий салат' },
    description: { ru: 'Спелые помидоры, огурцы, красный лук и ароматные травы.' },
    portion: { ru: '200 г' },
    price: 14000,
    image: img(salad, saladSm),
  },
  {
    id: 'tea-and-drinks',
    category: 'drinks',
    name: { ru: 'Чай и прохладительные напитки' },
    description: { ru: 'Зелёный или чёрный чай; холодные напитки — спросите у официанта.' },
    portion: { ru: 'чайник' },
    price: 8000,
    image: img(tea, teaSm),
  },
]

export const menuById = new Map(menu.map((item) => [item.id, item]))
