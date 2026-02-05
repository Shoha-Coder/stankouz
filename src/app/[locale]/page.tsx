import { ContactSection } from '@/shared/ui/contact-section/contact-section';
import { About } from '@/widgets/about/about';
import { Hero } from '@/widgets/hero/hero';
import { Machines } from '@/widgets/machines/machines';
import { News } from '@/widgets/news/news';
import { Partners } from '@/widgets/partners/partners';
import { Products } from '@/widgets/products/products';
import { Services } from '@/widgets/services/services';

export default async function HomePage() {
  return (
    <main>
      {/* Hero */}
      {/* Hero is a client component */}
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Hero />
      <About />
      <Services />
      <Products />
      <Machines />
      <News />
      <Partners />
      <ContactSection />
    </main>
  );
}
