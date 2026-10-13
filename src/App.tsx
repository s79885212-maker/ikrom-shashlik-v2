import { CartDrawer } from './components/cart/CartDrawer'
import { Header } from './components/Header'
import { MobileCartBar } from './components/MobileCartBar'
import { useCart } from './hooks/useCart'
import { useI18n } from './i18n'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { MenuSection } from './sections/MenuSection'

export default function App() {
  const { t } = useI18n()
  const { count, open } = useCart()

  // «Заказать»: если в корзине уже есть блюда — открываем её, иначе ведём к меню
  const handleOrder = () => {
    if (count > 0) open()
    else document.getElementById('menu')?.scrollIntoView()
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ground"
      >
        {t.skipToContent}
      </a>
      <Header onOrder={handleOrder} />
      <main id="main">
        <Hero onOrder={handleOrder} />
        <MenuSection />
        <About />
        <Features />
        <Contact />
      </main>
      <Footer />
      <MobileCartBar />
      <CartDrawer />
    </>
  )
}
