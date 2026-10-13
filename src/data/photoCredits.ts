/**
 * Временные фотографии взяты с Wikimedia Commons по свободным лицензиям.
 * Лицензии CC BY / CC BY-SA требуют указания автора — список выводится в подвале сайта.
 * После замены на собственные фотографии ресторана очистите этот массив.
 */
export interface PhotoCredit {
  subject: string
  author: string
  license: string
  url: string
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`

export const photoCredits: PhotoCredit[] = [
  { subject: 'Главное фото', author: 'Alandislands', license: 'CC BY-SA 4.0', url: commons('Grilled shashlik.jpg') },
  { subject: 'О нас', author: 'Valters Krontals', license: 'CC BY 2.0', url: commons('Shashlyk or Shashlik.jpg') },
  { subject: 'Шашлык из баранины', author: 'Muharramxon', license: 'CC BY 4.0', url: commons('Shashlik-national food of Uzbekistan.jpg') },
  { subject: 'Шашлык из говядины', author: 'Valentina Dyptan', license: 'CC BY-SA 4.0', url: commons('Shashlik. Armenia.jpg') },
  { subject: 'Шашлык из курицы', author: 'Pixel.la Free Stock Photos', license: 'CC0', url: commons('Food-dinner-grilled-shashlik (24244253091).jpg') },
  { subject: 'Люля-кебаб', author: 'Lesya Dolyk', license: 'CC BY-SA 2.0', url: commons('Lula kebab 2.jpg') },
  { subject: 'Картофель на углях', author: 'MOs810', license: 'CC BY-SA 4.0', url: commons('Pyry Gdynia (Grilled potatoes with dill butter).jpg') },
  { subject: 'Овощи на гриле', author: 'Tiia Monto', license: 'CC BY-SA 3.0', url: commons('Grilled vegetables Slovenia.jpg') },
  { subject: 'Свежий салат', author: 'Ralph Daily', license: 'CC BY 2.0', url: commons('Tomato Salad (7846872334).jpg') },
  { subject: 'Чай', author: 'ElenaLitera', license: 'CC BY-SA 4.0', url: commons('Узбекистан, рынок Чорсу, чаепитие (2).jpg') },
]
