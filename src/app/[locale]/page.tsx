import { ContactSection } from '@/shared/ui/contact-section/contact-section';
import { AnimatedSection } from '@/shared/ui/animated-section';
import { About } from '@/widgets/about/about';
import { Hero } from '@/widgets/hero/hero';
import { Machines } from '@/widgets/machines/machines';
import { News } from '@/widgets/news/news';
import { Partners } from '@/widgets/partners/partners';
import { Products } from '@/widgets/products/products';
import { Services } from '@/widgets/services/services';

const STAGGER = 0.06;

export default function HomePage() {
  return (
    <main>
      <AnimatedSection delay={0}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER}>
        <About />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER * 2}>
        <Services />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER * 3}>
        <Products />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER * 4}>
        <Machines />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER * 5}>
        <News />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER * 6}>
        <Partners />
      </AnimatedSection>
      <AnimatedSection delay={STAGGER * 7}>
        <ContactSection />
      </AnimatedSection>
    </main>
  );
}
