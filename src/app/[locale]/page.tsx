import { About } from '@/widgets/about/about';
import { Hero } from '@/widgets/hero/hero';

export default async function HomePage() {
  return (
    <main>
      {/* Hero */}
      {/* Hero is a client component */}
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Hero />
      <About />
    </main>
  );
}
